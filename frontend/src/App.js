import React from 'react';
import PipelineUI from './ui';
export default function App(){
  return <div className="app">
    <div className="sidebar">
      <div className="header"><div className="brand">VectorShift</div><div style={{marginLeft:'auto',fontSize:12}}></div></div>
      <PipelineUI.Toolbar />
    </div>
    <div className="canvas">
      <PipelineUI.Canvas />
    </div>
  </div>
}
