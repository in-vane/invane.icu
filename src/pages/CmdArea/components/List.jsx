import React, { useRef, useEffect, useState } from 'react';
import { getKey } from '../../../utils';

const List = (props) => {
  const { directory } = props;
  const [width, handleWidth] = useState();
  const refLs = useRef();

  useEffect(() => {
    let widths = [];
    for (let node of refLs.current.children) {
      widths.push(node.clientWidth);
    }
    const maxWidth = Math.max(...widths) + 16;
    handleWidth(maxWidth);
  }, []);

  return (
    <div ref={refLs}>
      {Object.keys(directory)
        .sort()
        .map((key) => (
          <span
            className={`ls-${directory[key].type}`}
            key={getKey()}
            style={{
              display: 'inline-block',
              width: width || 'auto',
            }}
          >
            {key}
          </span>
        ))}
    </div>
  );
};

export default List;
