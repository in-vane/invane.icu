import React from 'react';
import { getKey } from '../../utils';

const List = (props) => {
	const { directory } = props;

	return (
		<div>
			{Object.keys(directory).map((key) => (
				<span
					className={`ls-${directory[key].type}`}
					key={getKey()}
					style={{ marginRight: 24, display: 'inline-block' }}
				>
					{key}
				</span>
			))}
		</div>
	);
};

export default List;
