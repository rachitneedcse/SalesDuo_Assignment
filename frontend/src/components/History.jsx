import React, {useState} from 'react'
import axios from 'axios'
export default function History(){
  const [asin, setAsin] = useState('');
  const [rows, setRows] = useState([]);
  const fetch = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/optimize/history/${asin}`);
      setRows(res.data);
    } catch(e){ alert(e.message) }
  };
  return (
    <div className="card">
      <h2>History</h2>
      <input value={asin} onChange={e=>setAsin(e.target.value)} placeholder="ASIN for history" />
      <button onClick={fetch}>Get History</button>
      <div>
        {rows.map(r=>(
          <div key={r.id} className="history-item">
            <div><strong>{r.asin}</strong> — {new Date(r.created_at).toLocaleString()}</div>
            <div><strong>Optimized Title:</strong> {r.optimized_title}</div>
            <details><summary>See JSON</summary><pre>{r.optimized_bullets}</pre></details>
          </div>
        ))}
      </div>
    </div>
  )
}
