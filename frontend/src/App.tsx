import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import EntertainersPage from './Pages/EntertainersPage';
// import DetailsPage from './Pages/DetailsPage';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/entertainers" element={<EntertainersPage />} />
          {/* <Route path="/entertainers/:entertainerId" element={<DetailsPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
