import React from 'react';

const AccessDenied = (props) => {
	const { text } = props;
	return <div>{`-bash: ${text}: Access denied`}</div>;
};

export default AccessDenied;
