import MainNav from '../../components/MainNavbar/main-nav';
import CustomInput from '../../components/Input/custom-input';
import { Button } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const UserLogin = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const onChange = (e, value) => {
    setCheck(false);
    setUser({ ...user, [value]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      const dbResponse = await axios.post('/user/login', user);
      if (dbResponse && dbResponse.data && dbResponse.data.token) {
        localStorage.setItem('token', dbResponse.data.token);
        navigate('/user/home');
      }
    } catch (error) {
      setCheck(true);
    }
  };

  return (
    <>
      <MainNav></MainNav>
      <div className="user-login-main">
        <div className="bg-[url('assets/images/health-still-life-with-copy-space_23-2148854031.avif')] h-[calc(100vh_-_60px)] bg-no-repeat bg-cover bg-left w-full flex justify-center items-center">
          <div className="bg-transparent w-10/12  border-2  h-fit p-10 max-w-md backdrop-blur-[10px] rounded-2xl ">
            <form className="flex flex-col gap-4">
              <div className="text-center font-jost text-2xl font-bold ">
                User Login
              </div>
              <CustomInput
                label="Email"
                onChange={e => onChange(e, 'email')}
              ></CustomInput>
              <CustomInput
                label="Password"
                type="password"
                onChange={e => {
                  onChange(e, 'password');
                }}
              ></CustomInput>
              <div>
                <NavLink to="" className="">
                  Forgot Password?
                </NavLink>
              </div>
              {check ? (
                <p className="text-red-700">email or password is incorrect</p>
              ) : (
                ''
              )}
              <Button className="h-12" color="blue" onClick={onSubmit}>
                Login
              </Button>
              <div className="flex justify-center items-center gap-2">
                <div className="border-t-2 border-gray-500 w-40"></div>
                <div>Or</div>
                <div className="border-t-2 border-gray-500 w-40"></div>
              </div>
              <Button
                className="bg-transparent border-black border-2 text-black"
                onClick={onSubmit}
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};
export default UserLogin;
