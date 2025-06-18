const { useState, useEffect } = React;

function SalaryScaleManager() {
  const [ranks, setRanks] = useState([]);
  const [selectedRank, setSelectedRank] = useState('');
  const [scales, setScales] = useState([]);
  const [form, setForm] = useState({ year: new Date().getFullYear(), amount: '' });

  useEffect(() => {
    fetch('/api/ranks').then(res => res.json()).then(setRanks);
  }, []);

  useEffect(() => {
    if (selectedRank) {
      fetch(`/api/salary-scales/${selectedRank}`).then(res => res.json()).then(setScales);
    }
  }, [selectedRank]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    await fetch('/api/salary-scales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rankId: selectedRank, ...form })
    });
    setForm({ year: new Date().getFullYear(), amount: '' });
    const res = await fetch(`/api/salary-scales/${selectedRank}`);
    setScales(await res.json());
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title mb-3">Salary Scale Manager</h3>
        <div className="mb-3">
          <label className="form-label">Rank</label>
          <select className="form-select" value={selectedRank} onChange={e => setSelectedRank(e.target.value)}>
            <option value="">Select rank</option>
            {ranks.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>

        {selectedRank && (
          <>
            <table className="table table-sm table-bordered">
              <thead>
                <tr><th>Year</th><th>Amount</th></tr>
              </thead>
              <tbody>
                {scales.map(s => (
                  <tr key={s.id}><td>{s.year}</td><td>{s.amount}</td></tr>
                ))}
              </tbody>
            </table>

            <div className="row g-2 mt-3">
              <div className="col">
                <input type="number" name="year" className="form-control" value={form.year} onChange={update} />
              </div>
              <div className="col">
                <input type="number" name="amount" className="form-control" value={form.amount} onChange={update} />
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" onClick={submit}>Save</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<SalaryScaleManager />);
