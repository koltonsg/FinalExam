import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEntertainer } from '../api/EntertainersApi';
import BarNav from '../Components/BarNav';
import { Entertainer } from '../types/Entertainer';

const AddEntertainerPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Entertainer>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { entertainerId, bookingCount, lastBookingDate, ...cleanForm } = form;

    try {
      await addEntertainer(cleanForm as Entertainer);
      navigate('/entertainers');
    } catch (error) {
      alert('Failed to add entertainer');
      console.error(error);
    }
  };

  return (
    <>
      <BarNav />
      <div className="container mt-4">
        <h2>Add New Entertainer</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="entStageName"
            onChange={handleChange}
            placeholder="Stage Name"
            className="form-control mb-2"
          />
          <input
            name="entSsn"
            onChange={handleChange}
            placeholder="SSN"
            className="form-control mb-2"
          />
          <input
            name="entStreetAddress"
            onChange={handleChange}
            placeholder="Street Address"
            className="form-control mb-2"
          />
          <input
            name="entCity"
            onChange={handleChange}
            placeholder="City"
            className="form-control mb-2"
          />
          <input
            name="entState"
            onChange={handleChange}
            placeholder="State"
            className="form-control mb-2"
          />
          <input
            name="entZipCode"
            onChange={handleChange}
            placeholder="Zip Code"
            className="form-control mb-2"
          />
          <input
            name="entPhoneNumber"
            onChange={handleChange}
            placeholder="Phone Number"
            className="form-control mb-2"
          />
          <input
            name="entWebPage"
            onChange={handleChange}
            placeholder="Website"
            className="form-control mb-2"
          />
          <input
            name="entEmailAddress"
            onChange={handleChange}
            placeholder="Email"
            className="form-control mb-2"
          />
          <input
            name="dateEntered"
            onChange={handleChange}
            placeholder="Date Entered (YYYY-MM-DD)"
            className="form-control mb-3"
          />

          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEntertainerPage;
