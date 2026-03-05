import './App.css';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark app-navbar shadow-sm">
        <div className="container-fluid">
          <NavLink to="/users" className="navbar-brand fw-bold d-flex align-items-center gap-2 app-brand-link">
            <img src="/octofitapp-small.png" alt="OctoFit logo" className="app-brand-logo" />
            <span>OctoFit Tracker</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofitNav"
            aria-controls="octofitNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofitNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/users" className="nav-link px-3">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/teams" className="nav-link px-3">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/workouts" className="nav-link px-3">Workouts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/activities" className="nav-link px-3">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/leaderboard" className="nav-link px-3">Leaderboard</NavLink>
              </li>
            </ul>
            <a
              className="btn btn-outline-light btn-sm"
              href="https://react.dev/"
              target="_blank"
              rel="noreferrer"
            >
              React Docs
            </a>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="card border-0 shadow-sm mb-4 app-hero-card">
          <div className="card-body p-4">
            <h1 className="display-6 fw-bold mb-2">OctoFit Dashboard</h1>
            <p className="mb-0 text-secondary">
              Track your fitness data across users, teams, workouts, activities, and leaderboard metrics.
            </p>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
