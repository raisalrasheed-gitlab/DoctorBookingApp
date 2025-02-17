import './admin-login.css';
import NavBar from '../../../components/MainNavbar/main-nav';
import CustomInput from '../../../components/Input/custom-input';
import { useState } from 'react';
import axios from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [adminLog, setAdminLog] = useState({ email: '', password: '' });
  const [check, setCheck] = useState(0);
  const onChange = (e, key) => {
    setAdminLog({ ...adminLog, [key]: e.target.value });
    setCheck(0);
  };
  const onLoginBtn = async () => {
    try {
      const dbResponse = await axios.post('/admin/login', adminLog);
      console.log(dbResponse.data);
      if (dbResponse && dbResponse.data && dbResponse.data.token) {
        localStorage.setItem('token', dbResponse.data.token);
        localStorage.setItem('id', dbResponse.data.id);
        navigate('/admin/home');
      }
    } catch (error) {
      setCheck(1);
    }
  };
  return (
    <>
      <NavBar></NavBar>
      <div className="admin-login">
        <h2 style={{ textAlign: 'center' }}>Admin Login Page</h2>
        <div className="top-button">
          {check ? (
            <p style={{ color: 'orange', fontSize: '20px' }}>
              "Email or Password incorrect !!!"
            </p>
          ) : (
            ''
          )}
          <CustomInput
            label="Enter your Email :"
            onChange={e => onChange(e, 'email')}
          ></CustomInput>
          <CustomInput
            label="Enter your Password :"
            type="password"
            onChange={e => {
              onChange(e, 'password');
            }}
          ></CustomInput>
        </div>
        <button onClick={onLoginBtn}>Submit</button>
      </div>
    </>
  );
};
export default Login;
