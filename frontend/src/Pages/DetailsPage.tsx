import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { deleteEntertainer } from '../api/EntertainersApi';
import BarNav from '../Components/BarNav';

function DetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntertainer = async () => {
      try {
        console.log('Fetching entertainer ID:', id);
        setLoading(true);
        const response = await fetch(
          `https://localhost:4000/Entertainer/${id}`
        );
        console.log('Raw response:', response);

        if (!response.ok) {
          throw new Error(`Fetch failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched entertainer:', data);
        setEntertainer(data);
      } catch (err) {
        console.error('Error fetching entertainer:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEntertainer();
    }
  }, [id]);

  const handleDelete = async (entertainerId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this entertainer?'
    );
    if (!confirmDelete) return;

    try {
      await deleteEntertainer(entertainerId);
      setEntertainer(null); // Clear the page
      navigate('/entertainers'); // Go back to the list
    } catch (error) {
      console.error(error);
      alert('Failed to delete entertainer. Try again.');
    }
  };

  if (loading) return <p>Loading entertainer details...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!entertainer) return <p>No entertainer found.</p>;

  return (
    <>
      <BarNav />
      <div className="container mt-4">
        <div className="card shadow-sm">
          <h2 className="card-title">{entertainer.entStageName}</h2>
          <div className="card-body" style={{ textAlign: 'left' }}>
            <hr />
            <p>
              <strong>SSN:</strong> {entertainer.entSsn || 'N/A'}
            </p>
            <p>
              <strong>Address:</strong> {entertainer.entStreetAddress},{' '}
              {entertainer.entCity}, {entertainer.entState}{' '}
              {entertainer.entZipCode}
            </p>
            <p>
              <strong>Phone:</strong> {entertainer.entPhoneNumber || 'N/A'}
            </p>
            <p>
              <strong>Email:</strong> {entertainer.entEmailAddress || 'N/A'}
            </p>
            <p>
              <strong>Web Page:</strong> {entertainer.entWebPage || 'N/A'}
            </p>
            <p>
              <strong>Date Entered:</strong>{' '}
              {entertainer.dateEntered
                ? new Date(entertainer.dateEntered).toLocaleDateString()
                : 'N/A'}
            </p>
            <hr />
            <button
              onClick={() =>
                navigate(`/entertainer/edit/${entertainer.entertainerId}`)
              }
            >
              Edit
            </button>
            <button onClick={() => handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsPage;
