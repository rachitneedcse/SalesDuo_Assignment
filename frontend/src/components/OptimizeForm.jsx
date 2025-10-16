import React, {useState} from 'react'
import axios from 'axios'
export default function OptimizeForm(){
  const [asin, setAsin] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setResult(null);
    try {
      const res = await axios.post('https://salesduo-assignment.onrender.com/api/optimize', { asin });
      setResult(res.data);
    } catch (err) {
      alert(err?.response?.data?.error || err.message);
    } finally { setLoading(false); }
  };
  return (
    <div className="card">
      <form onSubmit={submit}>
        <label>ASIN</label>
        <input value={asin} onChange={e=>setAsin(e.target.value)} placeholder="Enter ASIN (e.g. B0...)" />
        <button type="submit" disabled={loading}>{loading ? 'Working...' : 'Optimize'}</button>
      </form>
      {result && (
        <div className="result">
          <h3>Original</h3>
          <p><strong>Title:</strong> {result.original.title}</p>
          <p><strong>Bullets:</strong></p>
          <ul>{(result.original.bullets||[]).map((b,i)=><li key={i}>{b}</li>)}</ul>
          <p><strong>Description:</strong> {result.original.description}</p>
          <h3>Optimized</h3>
          <p><strong>Title:</strong> {result.optimized.title}</p>
          <p><strong>Bullets:</strong></p>
          <ul>{(result.optimized.bullets||[]).map((b,i)=><li key={i}>{b}</li>)}</ul>
          <p><strong>Description:</strong> {result.optimized.description}</p>
          <p><strong>Keywords:</strong> {(result.optimized.keywords||[]).join(', ')}</p>
        </div>
      )}
    </div>
  )
}
