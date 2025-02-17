import { getId } from '../../../utils';
import './profile.css';
import AdminLayout from '../../../components/AdminLayout/admin-layout';
import axios from '../../../utils/axios';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [admin, setAdmin] = useState();
  const getAdmin = async () => {
    const getAdmin = await axios.get(`/admin/detail/${getId()}`);
    setAdmin(getAdmin.data);
  };
  console.log(admin);
  useEffect(() => {
    getAdmin();
  }, []);
  return (
    <>
      <AdminLayout heading="Profile Page">
        <div className="profile">
          <div>
            <h2>Role:</h2>
            <h3>{admin ? admin.role : ''}</h3>
          </div>
          <div>
            <h2>Email:</h2>
            <h3>{admin ? admin.email : ''}</h3>
          </div>
          <div>
            <h2>Password:</h2>
            <h3>******************</h3>
          </div>
          <div>
            <h2>Created Date:</h2>
            <h3>{admin ? admin.createdAt : ''}</h3>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};
export default Profile;
