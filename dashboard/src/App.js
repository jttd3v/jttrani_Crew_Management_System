const { useState, useEffect } = React;

function LineChart({ labels, data, label }) {
  const canvasRef = React.useRef(null);
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label,
          data,
          borderColor: 'rgba(99,102,241)',
          backgroundColor: 'rgba(99,102,241,0.3)',
        }],
      },
      options: { responsive: true }
    });
  }, [labels, data]);
  return <canvas ref={canvasRef}></canvas>;
}

function KPICard({ title, children }) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}

function App() {
  const [joining, setJoining] = useState({ joined: 0, expected: 0 });
  const [retention, setRetention] = useState(0);
  const [incidentData, setIncidentData] = useState([]);

  useEffect(() => {
    fetch('/api/joining-ratio?month=2024-01')
      .then(res => res.json())
      .then(setJoining);

    fetch('/api/retention-rate')
      .then(res => res.json())
      .then(data => setRetention(data.rate));

    fetch('/api/incidents?start=2023-01&end=2024-01')
      .then(res => res.json())
      .then(setIncidentData);
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <KPICard title="Joining Ratio">
        <p className="text-2xl">{joining.joined} / {joining.expected}</p>
      </KPICard>
      <KPICard title="Retention Rate">
        <p className="text-2xl">{(retention*100).toFixed(1)}%</p>
      </KPICard>
      <div className="md:col-span-2">
        <KPICard title="Incident Trend">
          <LineChart
            labels={incidentData.map(d => d.month)}
            data={incidentData.map(d => d.count)}
            label="Incidents"
          />
        </KPICard>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
