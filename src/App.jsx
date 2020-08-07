import React, { useRef } from 'react';
import CommandArea from './pages/CmdArea';
import StyleArea from './pages/StyleArea';
import ExpandArea from './pages/ExpandArea';
import './App.css';
import './ExpandStyle.css';

const App = () => {
  const refStyle = useRef();

  return (
    <div className='App'>
      <div className='left'>
        <CommandArea refStyle={refStyle} />
        <StyleArea ref={refStyle} />
      </div>
      <div className='right'>
        <ExpandArea />
      </div>
    </div>
  );
};

export default App;
