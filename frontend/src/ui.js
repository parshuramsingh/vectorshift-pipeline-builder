import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap, addEdge } from 'react-flow-renderer';
import useStore from './store';
import Toolbar from './components/Toolbar';
import InputNode from './nodes/InputNode';
import OutputNode from './nodes/OutputNode';
import LLMNode from './nodes/LLMNode';
import TextNode from './nodes/TextNode';
import DemoNode from './nodes/DemoNode';

import SubmitModal from './components/SubmitModal';

const nodeTypes = { 
  inputNode: InputNode, 
  outputNode: OutputNode, 
  llmNode: LLMNode, 
  textNode: TextNode, 
  demoNode: DemoNode 
};

function CanvasInner(){
  const { nodes, edges, setEdges, onNodesChange, onEdgesChange, deleteNode, deleteEdge } = useStore();
  const [modalData, setModalData] = useState(null);
  const [selected, setSelected] = useState({ nodes: [], edges: [] });

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

const onSubmit = useCallback(async () => {
  try {
    const resp = await fetch("http://127.0.0.1:8000/pipelines/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes, edges }),
    });

    if (!resp.ok) {
      throw new Error(`HTTP error! Status: ${resp.status}`);
    }

    const json = await resp.json();
    setModalData(json);
  } catch (err) {
    alert("Failed to submit: " + err.message);
  }
}, [nodes, edges]);


  // Handle Delete / Backspace
  useEffect(() => {
    function handleKeyDown(e){
      if(e.key === 'Delete' || e.key === 'Backspace'){
        selected.nodes.forEach(n => deleteNode(n.id));
        selected.edges.forEach(e => deleteEdge(e.id));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, deleteNode, deleteEdge]);

  return (
    <div style={{height:'100%', width:'100%'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        onSelectionChange={setSelected}  // 👈 track selection
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

<div style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 1000 }}>
  <button onClick={onSubmit}>Submit Pipeline</button>
</div>

      {modalData && <SubmitModal data={modalData} onClose={() => setModalData(null)} /> }
    </div>
  );
}

export default {
  Toolbar: Toolbar,
  Canvas: CanvasInner
};
