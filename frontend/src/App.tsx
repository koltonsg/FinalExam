import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import EntertainersPage from './Pages/EntertainersPage';
import DetailsPage from './Pages/DetailsPage';
import AddEntertainerPage from './Pages/AddEntertainerPage';
import EditEntertainerPage from './Pages/EditEntertainerPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/entertainers" element={<EntertainersPage />} />
          <Route path="/entertainer/:id" element={<DetailsPage />} />
          <Route path="/entertainer/add" element={<AddEntertainerPage />} />
          <Route
            path="/entertainer/edit/:id"
            element={<EditEntertainerPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
