import React from 'react';

const NoSuchFileOrDirectory = (props) => {
	const { text } = props;
	return <div>{`-bash: ${text}: No such file or directory`}</div>;
};

export default NoSuchFileOrDirectory;
