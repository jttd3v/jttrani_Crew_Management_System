const { useReducer, useState } = React;

const initial = {
  fullName: '',
  birthdate: '',
  nationality: '',
  email: '',
  contactNumber: '',
  address: '',
  sid: '',
  passportNo: '',
  seamansBookNo: '',
  rank: '',
  vesselPref: '',
  availabilityDate: '',
  experience: '',
  trainings: '',
};

function reducer(state, action) {
  return { ...state, [action.name]: action.value };
}

function App() {
  const [state, dispatch] = useReducer(reducer, initial);
  const [message, setMessage] = useState('');

  const update = (e) => {
    dispatch({ name: e.target.name, value: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!state.fullName || !state.email || !state.birthdate) {
      setMessage('Please fill required fields.');
      return;
    }
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });
    if (res.ok) {
      setMessage('Application submitted successfully.');
    } else {
      setMessage('Submission failed.');
    }
  };

  const input = (label, name, type = 'text', extra = '') => (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full border rounded p-2"
        type={type}
        name={name}
        id={name}
        value={state[name]}
        onChange={update}
        {...extra}
      />
    </div>
  );

  return (
    <form className="bg-white p-4 shadow rounded" onSubmit={submit}>
      {message && <p className="mb-2 text-green-600">{message}</p>}
      {input('Full Name', 'fullName')}
      {input('Birthdate', 'birthdate', 'date')}
      {input('Nationality', 'nationality')}
      {input('Email', 'email', 'email')}
      {input('Contact Number', 'contactNumber')}
      {input('Address', 'address')}
      {input("Seafarer's Identification Number (SID)", 'sid')}
      {input('Passport No.', 'passportNo')}
      {input("Seaman's Book No.", 'seamansBookNo')}
      {input('Rank Applied For', 'rank')}
      {input('Vessel Preference', 'vesselPref')}
      {input('Availability Date', 'availabilityDate', 'date')}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1" htmlFor="experience">
          Work Experience Summary
        </label>
        <textarea
          className="w-full border rounded p-2"
          id="experience"
          name="experience"
          rows="3"
          value={state.experience}
          onChange={update}
        ></textarea>
        <div className="text-xs text-gray-500">Include vessel type, position, duration.</div>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1" htmlFor="trainings">
          STCW Trainings
        </label>
        <textarea
          className="w-full border rounded p-2"
          id="trainings"
          name="trainings"
          rows="3"
          value={state.trainings}
          onChange={update}
        ></textarea>
        <div className="text-xs text-gray-500">Course name, completion date, institution.</div>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Submit</button>
    </form>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
