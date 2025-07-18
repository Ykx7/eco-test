import './Dashboard.css';

import Sidebar from '../../components/SideBar';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>

      {/* <div className="dashboard-content">
        <h1>Welcome to the Dashboard</h1>
        { Your main content goes here }
      </div> */}

    </div>
  );
}
