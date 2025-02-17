import AdminLayout from '../../../components/AdminLayout/admin-layout';
import { Table, Button } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios';
const Doctor = () => {
  const [doctor, setDoctor] = useState();
  useEffect(() => {
    getDoctor();
  }, []);
  const getDoctor = async () => {
    const dbResponse = await axios.get('/doctor');
    setDoctor(dbResponse.data);
  };
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: id => {
        return <img src={id} width="80px" height="50px"></img>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'firstname',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      render: id => {
        return id.name;
      },
    },
    {
      title: 'Hospital',
      dataIndex: 'hospital',
      render: id => {
        return id.name;
      },
    },
  ];

  return (
    <>
      <AdminLayout heading="Doctors">
        <div className="dept-add-btn">
          <Button
            color="blue"
            variant="solid"
            onClick={() => {
              navigate('/admin/doctor/add');
            }}
          >
            Add Doctor
          </Button>
        </div>
        <Table className="dpt-table" columns={columns} dataSource={doctor} />;
      </AdminLayout>
    </>
  );
};
export default Doctor;
