import React from 'react';

const Prefix = (props) => {
	const { position, text } = props;
	return (
		<div className='prefix'>
			{`[usr@in_vane ${position.join('/')}] #`}&nbsp;{text}
		</div>
	);
};

export default Prefix;
