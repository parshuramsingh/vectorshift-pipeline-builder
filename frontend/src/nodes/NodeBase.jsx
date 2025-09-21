import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

export default function NodeBase({ id, title, icon, inputs = [], outputs = [], children, style }) {
  return (
    <div style={{ padding:12, borderRadius:10, minWidth:200, background:'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', border:'1px solid rgba(255,255,255,0.03)', position:'relative', ...style }}>
      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
        <div style={{width:36,height:36, borderRadius:8, background:'rgba(255,255,255,0.03)', display:'flex', alignItems:'center', justifyContent:'center'}}>{icon}</div>
        <div style={{fontWeight:700}}>{title}</div>
      </div>

      <div>{children}</div>

      <div style={{position:'absolute', left:-10, top:36, display:'flex', flexDirection:'column', gap:10}}>
        {inputs.map((h, i) => (
          <div key={i} style={{display:'flex', alignItems:'center', gap:6}}>
            <Handle id={h.id || `${id}-in-${i}`} type="target" position={Position.Left} />
            <div style={{fontSize:12, color:'#94a3b8'}}>{h.label}</div>
          </div>
        ))}
      </div>

      <div style={{position:'absolute', right:-10, top:36, display:'flex', flexDirection:'column', gap:10}}>
        {outputs.map((h, i) => (
          <div key={i} style={{display:'flex', alignItems:'center', gap:6}}>
            <div style={{fontSize:12, color:'#94a3b8'}}>{h.label}</div>
            <Handle id={h.id || `${id}-out-${i}`} type="source" position={Position.Right} />
          </div>
        ))}
      </div>
    </div>
  );
}
