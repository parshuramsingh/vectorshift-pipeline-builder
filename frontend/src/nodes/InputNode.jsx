import React from 'react';
import NodeBase from './NodeBase';
import { FiDatabase } from 'react-icons/fi';

export default function InputNode({ id, data }){
  return <NodeBase id={id} title="Input" icon={<FiDatabase />} outputs={[{label:'out'}]}>
    <div style={{fontSize:13}}>Source input node</div>
  </NodeBase>
}
