import React from 'react';

const CommandNotFound = (props) => {
	const { text } = props;
	return <div>{`-bash: ${text}: command not found`}</div>;
};

export default CommandNotFound;
