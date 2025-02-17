import { Outlet, Navigate } from 'react-router-dom';
import { checkToken } from '../../utils/index';

const PrivateRoute = () => {
  if (checkToken()) {
    return <Outlet></Outlet>;
  } else return <Navigate to="/admin/login" />;
};
export default PrivateRoute;
