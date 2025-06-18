const { useState, useEffect } = React;

function ContractGenerator() {
  const [vessels, setVessels] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [form, setForm] = useState({
    vesselId: '',
    rankId: '',
    year: new Date().getFullYear(),
    salary: '',
    duration: '',
  });

  useEffect(() => {
    fetch('/api/vessels').then(res => res.json()).then(setVessels);
    fetch('/api/ranks').then(res => res.json()).then(setRanks);
  }, []);

  useEffect(() => {
    if (form.vesselId && form.rankId) {
      fetch(`/api/salary?rankId=${form.rankId}&vesselId=${form.vesselId}&year=${form.year}`)
        .then(res => res.json())
        .then(data => setForm(f => ({ ...f, salary: data.amount })));
    }
  }, [form.vesselId, form.rankId, form.year]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const generatePdf = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(`Vessel: ${form.vesselId}`, 10, 10);
    doc.text(`Rank: ${form.rankId}`, 10, 20);
    doc.text(`Salary: ${form.salary}`, 10, 30);
    doc.text(`Duration: ${form.duration}`, 10, 40);
    doc.save('contract.pdf');
  };

  const submit = async () => {
    const res = await fetch('/api/contracts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vesselId: form.vesselId,
        rankId: form.rankId,
        salary: form.salary,
        duration: form.duration,
        content: JSON.stringify(form),
      }),
    });
    if (res.ok) generatePdf();
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title mb-3">Contract Generator</h3>
        <div className="row mb-2">
          <div className="col">
            <label className="form-label">Vessel</label>
            <select name="vesselId" className="form-select" value={form.vesselId} onChange={update}>
              <option value="">Select vessel</option>
              {vessels.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
          <div className="col">
            <label className="form-label">Rank</label>
            <select name="rankId" className="form-select" value={form.rankId} onChange={update}>
              <option value="">Select rank</option>
              {ranks.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label className="form-label">Year</label>
            <input type="number" name="year" className="form-control" value={form.year} onChange={update} />
          </div>
          <div className="col">
            <label className="form-label">Duration (months)</label>
            <input type="number" name="duration" className="form-control" value={form.duration} onChange={update} />
          </div>
        </div>
        <div className="mb-2">
          <label className="form-label">Salary</label>
          <input type="number" name="salary" className="form-control" value={form.salary} onChange={update} />
          <div className="form-text">Auto-populated from scale, editable if necessary.</div>
        </div>
        <button className="btn btn-primary" onClick={submit}>Generate Contract</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ContractGenerator />);
