import React, { useEffect, useState, useRef } from 'react';
import { getKey } from '../utils';
import './index.css';

import {
	Prefix,
	Help,
	List,
	CommandNotFound,
	NoSuchFileOrDirectory,
	AccessDenied,
} from './components';
import { DIRECTORY } from './mock';

const Home = () => {
	const [position, handlePosition] = useState(['~']);
	const [DOMs, handleDOMs] = useState([]);
	const [history, handleHistory] = useState([]);
	const [historyP, handleHistoryP] = useState(0);
	const iptRef = useRef();

	useEffect(() => {
		document.addEventListener('keydown', (e) => {
			iptRef.current.focus();
			if (e.keyCode === 13) {
				e.preventDefault();
			}
		});
	}, []);

	useEffect(() => {
		window.scrollTo(0, document.body.scrollHeight);
	}, [document.body.scrollHeight]);

	const onKeyDown = (e) => {
		switch (e.keyCode) {
			case 13:
				onEnter(e);
				break;
			case 9:
				onTab(e);
				break;
			case 38:
				onUp(e);
				break;
			case 40:
				onDown(e);
				break;

			default:
				break;
		}
	};

	const onEnter = (e) => {
		e.preventDefault();
		const text = iptRef.current.textContent;
		const cmdArr = text.trim().replace(/\s+/g, ' ').split(' ');
		const cmd = cmdArr[0];
		switch (cmd) {
			case '':
				handleDOMs((pre) => [
					...pre,
					<Prefix position={position} text={text} key={getKey()} />,
				]);
				iptRef.current.textContent = '';
				break;
			case 'help':
				handleDOMs((pre) => [
					...pre,
					<Prefix position={position} text={text} key={getKey()} />,
					<Help key={getKey()} />,
				]);
				iptRef.current.textContent = '';
				break;
			case 'ls':
				const dirLs = position.length > 1 ? getDir() : DIRECTORY;
				handleDOMs((pre) => [
					...pre,
					<Prefix position={position} text={text} key={getKey()} />,
					<List directory={dirLs} key={getKey()} />,
				]);
				iptRef.current.textContent = '';
				break;
			case 'cd':
				iptRef.current.textContent = '';
				onCd(text, cmdArr);
				break;
			case 'cat':
				const dirCat = position.length > 1 ? getDir() : DIRECTORY;
				const fileName = cmdArr[1];
				handleDOMs((pre) => [
					...pre,
					<Prefix position={position} text={text} key={getKey()} />,
					dirCat[fileName] ? (
						<div key={getKey()} style={{ whiteSpace: 'pre-line' }}>
							{dirCat[fileName].ctx}
						</div>
					) : (
						<NoSuchFileOrDirectory text={text} key={getKey()} />
					),
				]);
				iptRef.current.textContent = '';
				break;
			case 'clear':
				handleDOMs([]);
				iptRef.current.textContent = '';
				break;

			default:
				handleDOMs((pre) => [
					...pre,
					<Prefix position={position} text={text} key={getKey()} />,
					<CommandNotFound text={text} key={getKey()} />,
				]);
				iptRef.current.textContent = '';
				break;
		}

		if (text) {
			handleHistory((pre) => [...pre, text]);
			handleHistoryP(history.length + 1);
		}
	};

	const onTab = (e) => {
		e.preventDefault();

		const cmdArr = iptRef.current.textContent
			.trim()
			.replace(/\s+/g, ' ')
			.split(' ');
		const cmd = cmdArr[0];
		if (cmdArr.length === 2) {
			const dirTab = position.length > 1 ? getDir() : DIRECTORY;
			Object.keys(dirTab).every((key) => {
				if (
					dirTab[key].type === (cmd === 'cd' ? 'folder' : 'file') &&
					key.startsWith(cmdArr[1])
				) {
					iptRef.current.textContent = `${cmd} ${key}`;
					return false;
				}
				return true;
			});
		}
	};

	const onUp = (e) => {
		const pointer = historyP === 0 ? 0 : historyP - 1;
		iptRef.current.textContent = history[pointer];
		handleHistoryP(pointer);
	};

	const onDown = (e) => {
		const max = history.length;
		const pointer = historyP === max ? max : historyP + 1;
		iptRef.current.textContent = history[pointer];
		handleHistoryP(pointer);
	};

	const getDir = () => {
		const deep = position.length - 1;
		let pt = 1;
		let dir = DIRECTORY[position[pt]].children;
		while (pt < deep) {
			console.log(dir);
			console.log(position[pt]);
			dir = dir[position[pt]].children || [];
			pt = pt + 1;
		}

		return dir;
	};

	const onCd = (text, cmdArr) => {
		let to = cmdArr[1];
		switch (cmdArr.length) {
			case 1:
				handleDOMs((pre) => [
					...pre,
					<Prefix position={position} text={text} key={getKey()} />,
				]);
				handlePosition(['~']);
				break;
			case 2:
				if (to === '/') {
					handleDOMs((pre) => [
						...pre,
						<Prefix position={position} text={text} key={getKey()} />,
						<AccessDenied text={text} key={getKey()} />,
					]);
				} else if (to === '~' || to === '~/') {
					handleDOMs((pre) => [
						...pre,
						<Prefix position={position} text={text} key={getKey()} />,
					]);
					handlePosition(['~']);
				} else if (to === '.' || to === './') {
					handleDOMs((pre) => [
						...pre,
						<Prefix position={position} text={text} key={getKey()} />,
					]);
				} else if (to === '..' || to === '../') {
					handleDOMs((pre) => [
						...pre,
						<Prefix position={position} text={text} key={getKey()} />,
					]);
					handlePosition((pre) => {
						let temp = [...pre];
						temp.pop();
						return temp;
					});
				} else {
					const dirCd = position.length > 1 ? getDir() : DIRECTORY;
					const toFormat = to?.replace(/\./g, '')?.replace(/\//g, '');
					handleDOMs((pre) => [
						...pre,
						<Prefix position={position} text={text} key={getKey()} />,
						!dirCd[toFormat] && (
							<NoSuchFileOrDirectory text={text} key={getKey()} />
						),
					]);
					dirCd[toFormat] && handlePosition((pre) => [...pre, toFormat]);
				}
				break;

			default:
				handleDOMs((pre) => [
					...pre,
					<Prefix position={position} text={text} key={getKey()} />,
					<NoSuchFileOrDirectory text={text} key={getKey()} />,
				]);
				break;
		}
	};

	return (
		<div className='App'>
			<div id='main'>
				Hi, I'm in_vane. Here is my blog based on Airing's terminal.
				<br />
				Try to find more information about me!
				<br />
				Type 'help' to get help.
				<br />
				Have fun :-)
				<br />
				<br />
				{DOMs}
			</div>
			<span className='prefix'>
				{`[usr@in_vane ${position.join('/')}] #`}&nbsp;
			</span>
			<span
				ref={iptRef}
				className='input-text'
				contentEditable
				spellCheck='false'
				autoCorrect='off'
				onKeyDown={onKeyDown}
				placeholder='asd'
			/>
		</div>
	);
};

export default Home;
