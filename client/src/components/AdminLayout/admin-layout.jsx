import { NavLink, useNavigate } from 'react-router-dom';
import './admin-layout.css';
import { Input, Space } from 'antd';
const { Search } = Input;

const AdminLayout = ({ children, heading }) => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem('token');
    console.log('logout');
    navigate('/admin/login');
  };
  return (
    <>
      <div className="admin-layout">
        <div className="nav-bar">
          <div className="image">
            <img src="/hospital logo.jpg"></img>
            <h2>MedicityHospital</h2>
          </div>
          <div className="search">
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              color="red"
            />
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
          <NavLink className="link" to="/admin/location">
            Locations
          </NavLink>
          <NavLink className="link" to="/admin/doctor">
            Doctors
          </NavLink>
          <NavLink className="link" to="/admin/profile">
            Profile
          </NavLink>
          <p className="others">Others</p>
          <NavLink className="link" to="/">
            Setting
          </NavLink>
          <div onClick={onLogout} className="logout">
            Logout
          </div>
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
