import React, { useState } from 'react';
import useStore from '../store';
import { FiCpu, FiDatabase, FiFileText, FiDownload } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';

const ALL_NODES = [
  { type: 'inputNode', name: 'Input', icon: <FiDatabase /> },
  { type: 'llmNode', name: 'LLM', icon: <FiCpu /> },
  { type: 'textNode', name: 'Text', icon: <FiFileText /> },
  { type: 'outputNode', name: 'Output', icon: <FiDownload /> },
  { type: 'demoNode', name: 'Logger', icon: <FiFileText /> },
];

export default function Toolbar(){
  const addNode = useStore(state => state.addNode);
  const [q, setQ] = useState('');
  const filtered = ALL_NODES.filter(n => n.name.toLowerCase().includes(q.toLowerCase()));

  function onDragStart(e, nodeType){
    e.dataTransfer.setData('application/reactflow', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  }

  function addAtRandom(type){
    const id = String(Date.now());
    const pos = { x: Math.random()*400 + 50, y: Math.random()*200 + 20 };
    addNode({ id, type, position:pos, data: { label: type }});
  }

  return (
    <div>
      <div className="search">
        <input placeholder="Search nodes..." value={q} onChange={(e)=>setQ(e.target.value)} />
      </div>
      <div>
        {filtered.map(n => (
          <div key={n.type} className="node-item" draggable onDragStart={(e)=>onDragStart(e,n.type)} onDoubleClick={()=>addAtRandom(n.type)}>
            <div className="node-icon">{n.icon}</div>
            <div>
              <div style={{fontWeight:700}}>{n.name}</div>
              <div className="small">Drag to canvas or double-click to add</div>
            </div>
          </div>
        ))}
      </div>

      <div className="toolbar-bottom">
        <button className="btn" onClick={()=>addAtRandom('inputNode')}>Add Input</button>
        <button className="btn" onClick={()=>addAtRandom('textNode')}>Add Text</button>
      </div>
    </div>
  );
}
