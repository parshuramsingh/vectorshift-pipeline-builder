import React from 'react';
import NodeBase from './NodeBase';
import { FiUpload } from 'react-icons/fi';

export default function OutputNode({ id, data }){
  // Add an output handle called 'out'
  return <NodeBase 
            id={id} 
            title="Output" 
            icon={<FiUpload />} 
            inputs={[{ label: 'in' }]} 
            outputs={[{ label: 'out' }]} //
         >
    <div style={{ fontSize: 13 }}>Terminal output</div>
  </NodeBase>
}
