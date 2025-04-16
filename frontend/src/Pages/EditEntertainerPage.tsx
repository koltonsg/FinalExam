import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import BarNav from '../Components/BarNav';

const EditEntertainerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Entertainer>>({});

  useEffect(() => {
    fetch(`https://localhost:4000/Entertainer/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch(() => alert('Failed to load entertainer'));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      `https://localhost:4000/Entertainer/UpdateEntertainer/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }
    );

    if (response.ok) {
      navigate('/entertainers');
    } else {
      alert('Failed to update entertainer');
    }
  };

  return (
    <>
      <BarNav />
      <div className="container mt-4">
        <h2>Edit Entertainer</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="entStageName"
            value={form.entStageName || ''}
            onChange={handleChange}
            placeholder="Stage Name"
            className="form-control mb-2"
          />
          <input
            name="entSsn"
            value={form.entSsn || ''}
            onChange={handleChange}
            placeholder="SSN"
            className="form-control mb-2"
          />
          <input
            name="entStreetAddress"
            value={form.entStreetAddress || ''}
            onChange={handleChange}
            placeholder="Street Address"
            className="form-control mb-2"
          />
          <input
            name="entCity"
            value={form.entCity || ''}
            onChange={handleChange}
            placeholder="City"
            className="form-control mb-2"
          />
          <input
            name="entState"
            value={form.entState || ''}
            onChange={handleChange}
            placeholder="State"
            className="form-control mb-2"
          />
          <input
            name="entZipCode"
            value={form.entZipCode || ''}
            onChange={handleChange}
            placeholder="Zip Code"
            className="form-control mb-2"
          />
          <input
            name="entPhoneNumber"
            value={form.entPhoneNumber || ''}
            onChange={handleChange}
            placeholder="Phone"
            className="form-control mb-2"
          />
          <input
            name="entWebPage"
            value={form.entWebPage || ''}
            onChange={handleChange}
            placeholder="Website"
            className="form-control mb-2"
          />
          <input
            name="entEmailAddress"
            value={form.entEmailAddress || ''}
            onChange={handleChange}
            placeholder="Email"
            className="form-control mb-2"
          />
          <input
            name="dateEntered"
            value={form.dateEntered || ''}
            onChange={handleChange}
            placeholder="Date Entered (YYYY-MM-DD)"
            className="form-control mb-3"
          />

          <button className="btn btn-primary" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditEntertainerPage;
