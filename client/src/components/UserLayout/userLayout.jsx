import { Button } from 'antd';
import { FaBars } from 'react-icons/fa';
import { FaCalendarPlus } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UserLayout = () => {
  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/user/login');
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="flex h-20 items-center justify-between   border-b-2 sticky top-0 bg-white z-10">
        <div className=" flex items-center ml-10 font-logo font-black text-2xl [text-shadow:_0_1px_2px_black] text-[#045ec0]">
          <FaCalendarPlus className="text-green-500 text-3xl" />{' '}
          <span className="text-4xl p-1 align-super">Q</span>uick Appoinment
        </div>
        <div className="xl:flex items-center  gap-20  text-md font-semibold hidden cursor-pointer tracking-wide">
          <div className="rounded-md hover:bg-green-500 p-2 h-10 flex items-center justify-center">
            <NavLink to="/user/home">Home</NavLink>
          </div>
          <div className="h-10  hover:bg-green-500 rounded-md flex items-center justify-center p-2">
            Hospitals
          </div>
          <div className="h-10  hover:bg-green-500 rounded-md flex items-center justify-center p-2">
            Doctors
          </div>
          <div className="h-10  hover:bg-green-500 rounded-md flex items-center justify-center p-2">
            Bookings
          </div>
        </div>
        <div className="flex mr-10 2xl:mr-0 items-center">
          <div className="md:flex mr-10 items-center gap-5 hidden">
            <span className="text-md font-semibold font-jost flex items-center gap-1 ">
              <CgProfile className="text-3xl text-blue-600" />
              Profile
            </span>
            <Button className="bg-red-400 text-white" onClick={onLogout}>
              Logout
            </Button>
          </div>
          <div className="xl:hidden  ">
            <FaBars />
          </div>
        </div>
      </div>
    </>
  );
};
export default UserLayout;
