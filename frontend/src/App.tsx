import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import SimulationPage from './pages/SimulationPage';
import FindingsPage from './components/Findings/FindingsPage';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1>AI Community Dynamics</h1>
          </Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/simulate">Simulate</Link></li>
            <li><Link to="/findings">Findings</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/simulate" element={<SimulationPage />} />
          <Route path="/findings" element={<FindingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
