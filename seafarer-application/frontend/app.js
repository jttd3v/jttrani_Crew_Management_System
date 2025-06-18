const { useReducer, useState } = React;

const initial = {
  fullName: '',
  birthdate: '',
  nationality: '',
  email: '',
  contactNumber: '',
  address: '',
  sid: '',
  passport: '',
  seamanBook: '',
  rank: '',
  vesselPref: '',
  availabilityDate: '',
  experience: '',
  trainings: ''
};

function reducer(state, action) {
  switch(action.type) {
    case 'set':
      return { ...state, [action.field]: action.value };
    case 'reset':
      return initial;
    default:
      return state;
  }
}

function ApplicationForm() {
  const [form, dispatch] = useReducer(reducer, initial);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (e) => {
    dispatch({ type: 'set', field: e.target.name, value: e.target.value });
  };

  const validate = () => {
    const e = {};
    if(!form.fullName) e.fullName = 'Required';
    if(!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if(!form.birthdate) e.birthdate = 'Required';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const v = validate();
    setErrors(v);
    if(Object.keys(v).length) return;

    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if(res.ok) {
      setSent(true);
      dispatch({type:'reset'});
    }
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      {sent && <div className="p-2 bg-green-100 text-green-800">Application submitted.</div>}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block">Full Name</label>
          <input name="fullName" value={form.fullName} onChange={update} className="mt-1 p-2 border w-full" required />
          {errors.fullName && <div className="text-red-600 text-sm">{errors.fullName}</div>}
        </div>
        <div>
          <label className="block">Birthdate</label>
          <input type="date" name="birthdate" value={form.birthdate} onChange={update} className="mt-1 p-2 border w-full" required />
        </div>
        <div>
          <label className="block">Nationality</label>
          <input name="nationality" value={form.nationality} onChange={update} className="mt-1 p-2 border w-full" />
        </div>
        <div>
          <label className="block">Email</label>
          <input type="email" name="email" value={form.email} onChange={update} className="mt-1 p-2 border w-full" required />
          {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
        </div>
        <div>
          <label className="block">Contact Number</label>
          <input name="contactNumber" value={form.contactNumber} onChange={update} className="mt-1 p-2 border w-full" />
        </div>
        <div>
          <label className="block">Address</label>
          <input name="address" value={form.address} onChange={update} className="mt-1 p-2 border w-full" />
        </div>
        <div>
          <label className="block">SID <span className="text-gray-500" title="Seafarer\'s Identification Number">?</span></label>
          <input name="sid" value={form.sid} onChange={update} className="mt-1 p-2 border w-full" />
        </div>
        <div>
          <label className="block">Passport No.</label>
          <input name="passport" value={form.passport} onChange={update} className="mt-1 p-2 border w-full" />
        </div>
        <div>
          <label className="block">Seaman's Book No.</label>
          <input name="seamanBook" value={form.seamanBook} onChange={update} className="mt-1 p-2 border w-full" />
        </div>
        <div>
          <label className="block">Rank Applied For</label>
          <input name="rank" value={form.rank} onChange={update} className="mt-1 p-2 border w-full" required />
        </div>
        <div>
          <label className="block">Vessel Preference</label>
          <input name="vesselPref" value={form.vesselPref} onChange={update} className="mt-1 p-2 border w-full" />
        </div>
        <div>
          <label className="block">Availability Date</label>
          <input type="date" name="availabilityDate" value={form.availabilityDate} onChange={update} className="mt-1 p-2 border w-full" />
        </div>
      </div>
      <div>
        <label className="block">Work Experience Summary</label>
        <textarea name="experience" value={form.experience} onChange={update} className="mt-1 p-2 border w-full" rows="3" placeholder="Vessel type, position, duration"></textarea>
      </div>
      <div>
        <label className="block">STCW Trainings</label>
        <textarea name="trainings" value={form.trainings} onChange={update} className="mt-1 p-2 border w-full" rows="3" placeholder="Course name, completion date, institution"></textarea>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">Submit</button>
    </form>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ApplicationForm />);
