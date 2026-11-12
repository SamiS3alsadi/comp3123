import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const provinces = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
];

const emptyForm = {
  email: '',
  fullName: '',
  address: '',
  address2: '',
  city: '',
  province: '',
  postalCode: '',
  agree: false,
};

function App() {
  // Part I: holds what the user is typing in the form
  const [form, setForm] = useState(emptyForm);
  // Part II: holds the data shown below the form after Submit
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from reloading
    setSubmitted(form);
  };

  return (
    <div className="container mt-4">
      <div className="form-box p-3">
        <h1 className="text-center mb-3">Data Entry Form</h1>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3 text-center">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email"
                placeholder="Enter email" value={form.email} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3 text-center">
              <label htmlFor="fullName" className="form-label">Name</label>
              <input type="text" className="form-control" id="fullName" name="fullName"
                placeholder="Full Name" value={form.fullName} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3 text-center">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" name="address"
              placeholder="1234 Main St" value={form.address} onChange={handleChange} />
          </div>

          <div className="mb-3 text-center">
            <label htmlFor="address2" className="form-label">Address 2</label>
            <input type="text" className="form-control" id="address2" name="address2"
              placeholder="Apartment, studio, or floor" value={form.address2} onChange={handleChange} />
          </div>

          <div className="row">
            <div className="col-md-4 mb-3 text-center">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" className="form-control" id="city" name="city"
                value={form.city} onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3 text-center">
              <label htmlFor="province" className="form-label">Province</label>
              <select className="form-select" id="province" name="province"
                value={form.province} onChange={handleChange}>
                <option value="">Choose...</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 mb-3 text-center">
              <label htmlFor="postalCode" className="form-label">Postal Code</label>
              <input type="text" className="form-control" id="postalCode" name="postalCode"
                value={form.postalCode} onChange={handleChange} />
            </div>
          </div>

          <div className="form-check d-flex justify-content-center gap-2 mb-3">
            <input type="checkbox" className="form-check-input" id="agree" name="agree"
              checked={form.agree} onChange={handleChange} />
            <label htmlFor="agree" className="form-check-label">Agree Terms &amp; Condition?</label>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>

      {/* Part II: show the entered data after Submit */}
      {submitted && (
        <div className="output-box mt-4 p-3">
          <table className="table table-bordered mb-0">
            <tbody>
              <tr><th>Email:</th><td>{submitted.email}</td></tr>
              <tr><th>Full Name:</th><td>{submitted.fullName}</td></tr>
              <tr><th>Address:</th><td>{submitted.address}</td></tr>
              {submitted.address2 && (
                <tr><th>Address 2:</th><td>{submitted.address2}</td></tr>
              )}
              <tr><th>City:</th><td>{submitted.city}</td></tr>
              <tr><th>Province:</th><td>{submitted.province}</td></tr>
              <tr><th>Postal Code:</th><td>{submitted.postalCode}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;