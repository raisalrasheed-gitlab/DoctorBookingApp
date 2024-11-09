import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout/admin-layout.jsx';
import Adminhome from './pages/Admin/Home/Home.jsx';
import AdminDoctor from './pages/Admin/Doctor/doctor.jsx';
import AdminHospital from './pages/Admin/Hospital/hospital.jsx';
import AdminDepartment from './pages/Admin/Department/department.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/home" element={<Adminhome />}></Route>
        <Route path="/admin/doctor" element={<AdminDoctor />}></Route>
        <Route path="/admin/hospital" element={<AdminHospital />}></Route>
        <Route path="/admin/department" element={<AdminDepartment />}></Route>
      </Routes>
    </>
  );
};
export default App;
