import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { fetchEntertainers } from '../api/EntertainersApi';
import BarNav from '../Components/BarNav';
import '../css/EntertainerPage.css';

function EntertainersPage() {
  const navigate = useNavigate();
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEntertainers = async () => {
      try {
        setLoading(true);
        const data = await fetchEntertainers(pageSize, pageNum);
        setEntertainers(data);
        setTotalPages(Math.ceil(data.length / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadEntertainers();
  }, [pageSize, pageNum]);

  if (loading) return <p>Loading Entertainers...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <>
      <BarNav />
      <div>
        <button
          onClick={() => navigate('/entertainer/add')}
          className="btn btn-success"
        >
          Add an Entertainer
        </button>
      </div>
      <div className="entertainers-page">
        <div className="container mt-5">
          <h1 className="text-center mb-4">Entertainers</h1>
          <p className="text-center text-muted mb-5">
            Explore our talented performers below.
          </p>

          <div className="row">
            {entertainers.map((e) => (
              <div
                key={e.entertainerId}
                className="col-md-4 mb-4"
                onClick={() => navigate(`/entertainer/${e.entertainerId}`)}
              >
                <div className="card h-100 shadow-sm entertainer-card">
                  <div className="card-body">
                    <h5 className="card-title">{e.entStageName}</h5>
                    <p>
                      <strong>City:</strong> {e.entCity}
                    </p>
                    <p>
                      <strong>Email:</strong> {e.entEmailAddress || 'N/A'}
                    </p>
                    <p>
                      <strong>Total Bookings:</strong> {e.bookingCount}
                    </p>
                    <p>
                      <strong>Last Booked:</strong>{' '}
                      {e.lastBookingDate
                        ? new Date(e.lastBookingDate).toLocaleDateString()
                        : 'Never'}
                    </p>
                    <div className="text-muted small">
                      Click to view details
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default EntertainersPage;
