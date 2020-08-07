import React, { useEffect, useState, useRef } from 'react';
import { getKey } from '../../utils';
import './index.css';

import {
  Prefix,
  Help,
  List,
  CommandNotFound,
  NoSuchFileOrDirectory,
  AccessDenied,
} from './components';
import { welcome } from './articles';
import { DIRECTORY } from './directory';

const CmdArea = (props) => {
  const [position, handlePosition] = useState(['~']);
  const [DOMs, handleDOMs] = useState([]);
  const [history, handleHistory] = useState([]);
  const [historyP, handleHistoryP] = useState(0);
  const [isExpand, handleIsExpand] = useState(false);

  const refIpt = useRef();
  const refCmd = useRef();

  const { refStyle } = props;

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      refIpt.current.focus();
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    });
  }, []);

  useEffect(() => {
    isExpand
      ? (refCmd.current.scrollTop = refCmd.current.scrollHeight)
      : window.scrollTo(0, refCmd.current.scrollHeight);
  });

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
    const text = refIpt.current.textContent;
    const cmdArr = text.trim().replace(/\s+/g, ' ').split(' ');
    const cmd = cmdArr[0];
    switch (cmd) {
      case '':
        handleDOMs((pre) => [
          ...pre,
          <Prefix position={position} text={text} key={getKey()} />,
        ]);
        refIpt.current.textContent = '';
        break;
      case 'help':
        handleDOMs((pre) => [
          ...pre,
          <Prefix position={position} text={text} key={getKey()} />,
          <Help key={getKey()} />,
        ]);
        refIpt.current.textContent = '';
        break;
      case 'ls':
        const dirLs = getDir();
        handleDOMs((pre) => [
          ...pre,
          <Prefix position={position} text={text} key={getKey()} />,
          <List directory={dirLs} key={getKey()} />,
        ]);
        refIpt.current.textContent = '';
        break;
      case 'cd':
        onCd(text, cmdArr);
        refIpt.current.textContent = '';
        break;
      case 'cat':
        const dirCat = getDir();
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
        refIpt.current.textContent = '';
        break;
      case 'clear':
        handleDOMs([]);
        refIpt.current.textContent = '';
        break;
      case 'expand!':
        if (!isExpand) {
          const ref = refStyle.current;
          ref.writeTo(ref.refPre.current, ref.style, 0, 1);
          handleIsExpand(true);
        }
        handleDOMs((pre) => [
          ...pre,
          <Prefix position={position} text={text} key={getKey()} />,
          isExpand && <div key={getKey()}>You've already expanded.</div>,
        ]);
        refIpt.current.textContent = '';
        break;

      default:
        handleDOMs((pre) => [
          ...pre,
          <Prefix position={position} text={text} key={getKey()} />,
          <CommandNotFound text={text} key={getKey()} />,
        ]);
        refIpt.current.textContent = '';
        break;
    }

    if (text) {
      handleHistory((pre) => [...pre, text]);
      handleHistoryP(history.length + 1);
    }
  };

  const onTab = (e) => {
    e.preventDefault();

    const cmdArr = refIpt.current.textContent
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ');
    const cmd = cmdArr[0];
    if (cmdArr.length === 2) {
      const dirTab = getDir();
      Object.keys(dirTab).every((key) => {
        if (
          dirTab[key].type === (cmd === 'cd' ? 'folder' : 'file') &&
          key.startsWith(cmdArr[1])
        ) {
          refIpt.current.textContent = `${cmd} ${key}`;
          return false;
        }
        return true;
      });
    }
  };

  const onUp = (e) => {
    const pointer = historyP === 0 ? 0 : historyP - 1;
    refIpt.current.textContent = history[pointer];
    handleHistoryP(pointer);
  };

  const onDown = (e) => {
    const max = history.length;
    const pointer = historyP === max ? max : historyP + 1;
    refIpt.current.textContent = history[pointer];
    handleHistoryP(pointer);
  };

  const getDir = () => {
    const deep = position.length - 1;
    let pt = 0;
    let dir = DIRECTORY[position[pt]].children;
    while (pt < deep) {
      pt = pt + 1;
      dir = dir[position[pt]].children || [];
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
          const isLogin = window.password === 'passw0rd';
          handleDOMs((pre) => [
            ...pre,
            <Prefix position={position} text={text} key={getKey()} />,
            !isLogin && <AccessDenied text={text} key={getKey()} />,
          ]);
          isLogin && handlePosition(['/']);
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
          position.length !== 1 &&
            handlePosition((pre) => {
              let temp = [...pre];
              temp.pop();
              return temp;
            });
        } else {
          const dirCd = getDir();
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
    <div className='command' ref={refCmd}>
      <div className='main'>
        <pre>{welcome}</pre>
        {DOMs}
      </div>
      <span className='prefix'>
        {`[usr@in_vane ${position.join('/')}] #`}&nbsp;
      </span>
      <span
        ref={refIpt}
        className='input'
        contentEditable
        spellCheck='false'
        autoCorrect='off'
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default CmdArea;
