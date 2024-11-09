import { NavLink } from 'react-router-dom';
import './admin-layout.css';

const AdminLayout = ({ children, heading }) => {
  return (
    <>
      <div className="admin-layout">
        <div className="nav-bar">
          <div className="image">
            <img src="/doctor-logo.png"></img>
            <h2>HI-DENT</h2>
          </div>
        </div>
        <div className="side-bar">
          <p className="pages">Pages</p>

          <NavLink className="link" to="/admin/home">
            Home
          </NavLink>
          <NavLink className="link" to="/admin/department">
            Departments
          </NavLink>
          <NavLink className="link" to="/admin/hospital">
            Hospitals
          </NavLink>
          <NavLink className="link" to="/admin/doctor">
            Doctors
          </NavLink>
          <NavLink className="link" to="/admin/profile">
            Profile
          </NavLink>
          <p className="others">Others</p>
          <div>Setting</div>
          <div>Logout</div>
        </div>
        <div className="main">
          <h2>{heading}</h2>
          {children}
        </div>
      </div>
    </>
  );
};
export default AdminLayout;
