import React, { useEffect, useRef, useState } from 'react';
import NodeBase from './NodeBase';

/**
 * TextNode:
 * - auto-resizes width/height based on content
 * - parses {{variable}} occurrences and creates input handles for each unique variable
 */

export default function TextNode({ id, data }){
  const initial = data?.text || '';
  const [text, setText] = useState(initial);
  const [vars, setVars] = useState([]);
  const taRef = useRef();

  useEffect(()=>{
    parseVars(text);
    autosize();
    // eslint-disable-next-line
  }, [text]);

  function parseVars(s){
    const regex = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;
    const found = [];
    let m;
    while((m = regex.exec(s)) !== null){
      if(!found.includes(m[1])) found.push(m[1]);
    }
    setVars(found);
  }

  function autosize(){
    const ta = taRef.current;
    if(!ta) return;
    const lines = text.split('\n');
    const maxLen = Math.max(...lines.map(l=>l.length), 10);
    ta.style.width = Math.min(Math.max(140, maxLen * 7 + 40), 560) + 'px';
    ta.style.height = 'auto';
    const newH = Math.min(Math.max(48, ta.scrollHeight), 400);
    ta.style.height = newH + 'px';
  }

  return (
    <NodeBase id={id} title="Text" icon={<span style={{fontWeight:700}}>T</span>} inputs={vars.map(v=>({label:v,id:`${id}-var-${v}`}))} outputs={[{label:'text'}]}>
      <div style={{display:'flex', flexDirection:'column', gap:8}}>
        <textarea
          ref={taRef}
          value={text}
          onChange={(e)=>setText(e.target.value)}
          placeholder="Type text. Use {{variable}} to create inputs."
          style={{resize:'none', minWidth:140, minHeight:48, padding:8, borderRadius:8, border:'1px solid rgba(255,255,255,0.03)', background:'transparent', color:'inherit'}}
        />
        <div style={{fontSize:12, color:'#94a3b8'}}>Variables: {vars.length?vars.join(', '):'none'}</div>
      </div>
    </NodeBase>
  );
}
