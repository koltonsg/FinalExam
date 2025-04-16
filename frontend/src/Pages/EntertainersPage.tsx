import { useEffect, useState } from 'react';
import Pagination from '../Components/Pagination';
import { useNavigate } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { fetchEntertainers } from '../api/EntertainersApi';
import BarNav from '../Components/BarNav';

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
        console.log('API Response:', data);
        setEntertainers(data.entertainers);
        setTotalPages(Math.ceil(data.totalNumEntertainers / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadEntertainers();
  }, [pageSize, pageNum]);

  if (loading) return <p>Loading Entertainers...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;




  return (
    <>
      <BarNav />
      <div>
        <h1>Entertainers</h1>
        <p>List of entertainers will be displayed here.</p>
      </div>

      {entertainers.map((e) => (
        <div id="bookCard" className="card" key={e.entertainerId}>
          <h3 className="card-title">{e.entStageName}</h3>
          <div className="card-body">
            <p>Total Bookings: </p>
            <p>Most Recent Booking: </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/entertainer/${e.entertainerId}`)}
            />
          </div>
        </div>
      ))}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default EntertainersPage