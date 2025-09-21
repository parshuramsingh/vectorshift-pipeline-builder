import React from 'react';
import NodeBase from './NodeBase';
import { FiBook } from 'react-icons/fi';

export default function DemoNode({ id, data }){
  return <NodeBase id={id} title="Logger" icon={<FiBook />} inputs={[{label:'payload'}]}>
    <div style={{fontSize:13}}>Logs incoming data</div>
  </NodeBase>
}
