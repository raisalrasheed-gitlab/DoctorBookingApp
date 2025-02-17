import { Routes, Route } from 'react-router-dom';
import Adminhome from './pages/Admin/Home/Home.jsx';
import AdminDoctor from './pages/Admin/Doctor/doctor.jsx';
import AdminHospital from './pages/Admin/Hospital/hospital.jsx';
import AdminDepartment from './pages/Admin/Department/department.jsx';
import AdminAddDepartment from './pages/Admin/Add-department/add-department.jsx';
import AdminAddHospital from './pages/Admin/Add-hospital/add-hospital.jsx';
import AdminLocation from './pages/Admin/Location/location.jsx';
import AdminLogin from './pages/Admin/Login/admin-login.jsx';
import AdminProfile from './pages/Admin/Profile/profile.jsx';
import AdminAddDoctor from './pages/Admin/Add-doctor/add-doctor.jsx';
import PrivateRoute from './components/PrivateRoute/private.jsx';
import UserLogin from './pages/User/login.jsx';
import UserHome from './pages/User/home.jsx';
import UserSearchHospital from './pages/User/searchHospital.jsx';
import Userdepartment from './pages/User/Userdepartment.jsx';
import UserDoctor from './pages/User/doctorBooking.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="/admin/home" element={<Adminhome />} />
          <Route path="/admin/doctor" element={<AdminDoctor />} />
          <Route path="/admin/hospital" element={<AdminHospital />} />
          <Route path="/admin/department" element={<AdminDepartment />} />
          <Route
            path="/admin/department/add"
            element={<AdminAddDepartment />}
          />
          <Route
            path="/admin/department/edit/:id"
            element={<AdminAddDepartment />}
          />
          <Route path="/admin/hospital/add" element={<AdminAddHospital />} />
          <Route path="/admin/hospital/add" element={<AdminAddHospital />} />
          <Route
            path="/admin/hospital/edit/:id"
            element={<AdminAddHospital />}
          />
          <Route path="/admin/doctor/add" element={<AdminAddDoctor />} />
          <Route path="/admin/location" element={<AdminLocation />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route
          path="/user/search/hospital/:id"
          element={<UserSearchHospital />}
        />
        <Route
          path="/user/search/hospital/department/:id"
          element={<Userdepartment />}
        />
        <Route
          path="/user/search/doctor/department/booking/:hId/:dId"
          element={<UserDoctor />}
        />
      </Routes>
    </>
  );
};
export default App;
