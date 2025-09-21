import React from 'react';
import NodeBase from './NodeBase';
import { FiCpu } from 'react-icons/fi';

export default function LLMNode({ id, data }){
  return <NodeBase id={id} title="LLM" icon={<FiCpu />} inputs={[{label:'prompt'}]} outputs={[{label:'response'}]}>
    <div style={{fontSize:13}}>Generative model node</div>
  </NodeBase>
}
