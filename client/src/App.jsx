import { Routes, Route } from 'react-router-dom';
import Adminhome from './pages/Admin/Home/Home.jsx';
import AdminDoctor from './pages/Admin/Doctor/doctor.jsx';
import AdminHospital from './pages/Admin/Hospital/hospital.jsx';
import AdminDepartment from './pages/Admin/Department/department.jsx';
import AdminAddDepartment from './pages/Admin/Add-department/add-department.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/home" element={<Adminhome />}></Route>
        <Route path="/admin/doctor" element={<AdminDoctor />}></Route>
        <Route path="/admin/hospital" element={<AdminHospital />}></Route>
        <Route path="/admin/department" element={<AdminDepartment />}></Route>
        <Route
          path="/admin/department/add"
          element={<AdminAddDepartment />}
        ></Route>
        <Route
          path="/admin/department/edit/:id"
          element={<AdminAddDepartment />}
        ></Route>
      </Routes>
    </>
  );
};
export default App;
