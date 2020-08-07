import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { style } from './style';
import { writeChar } from '../../utils';
import './index.css';

const common = /\D[,]\s$/;
const endOfBlock = /[^/]\n\n$/;
const endOfSentence = /[.?!]\s$/;
const speed = 0;

const StyleArea = (props, ref) => {
  const refStyle = useRef();
  const refPre = useRef();
  const styleElement = document.getElementById('animation-style');

  useImperativeHandle(ref, () => ({
    writeTo: writeTo,
    refPre: refPre,
    style: style,
  }));

  const writeTo = async (el, message, index, charsPerInterval) => {
    let chars = message.slice(index, index + charsPerInterval);
    index += charsPerInterval;
    writeChar(el, chars, styleElement);
    refStyle.current.scrollTop = el.scrollHeight;

    if (index < message.length) {
      let tempSpeed = speed;
      const thisSlice = message.slice(index - 2, index + 1);
      common.test(thisSlice) && (tempSpeed = speed * 30);
      endOfBlock.test(thisSlice) && (tempSpeed = speed * 50);
      endOfSentence.test(thisSlice) && (tempSpeed = speed * 70);
      await new Promise((resolve) => setTimeout(() => resolve(), tempSpeed));

      return writeTo(el, message, index, charsPerInterval);
    }
  };

  return (
    <div className='style' spellCheck='false' ref={refStyle}>
      <pre id='style-text' ref={refPre} />
    </div>
  );
};

export default forwardRef(StyleArea);
