import React from 'react';

export default function SubmitModal({ data, onClose }){
  if(!data) return null;
  const { num_nodes, num_edges, is_dag } = data;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <h3 style={{margin:0}}>Pipeline Analysis</h3>
        <p className="small">Result from backend</p>

        <div style={{marginTop:12}}>
          <div className="result-row"><div>Nodes</div><div style={{fontWeight:700}}>{num_nodes}</div></div>
          <div className="result-row"><div>Edges</div><div style={{fontWeight:700}}>{num_edges}</div></div>
          <div className="result-row"><div>Is DAG</div><div style={{fontWeight:700}}>{is_dag ? 'Yes' : 'No'}</div></div>
        </div>

        <div style={{textAlign:'right', marginTop:12}}>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
