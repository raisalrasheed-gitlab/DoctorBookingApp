import { Button, Table } from 'antd';
import AdminLayout from '../../../components/AdminLayout/admin-layout';
import './hospital.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios';

const Hospital = () => {
  const navigate = useNavigate();
  const [hospital, setHospital] = useState([]);
  useEffect(() => {
    getHospital();
  }, []);
  const getHospital = async () => {
    const dbResponse = await axios.get('/hospital/all');
    setHospital(dbResponse.data);
  };
  const onDelete = async key => {
    const dbResponse = await axios.delete(`/hospital/${key}`);
    getHospital();
  };
  const coloumn = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
      width: '5%',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: img => {
        return <img src={img} width="70px"></img>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: id => {
        return id.name;
      },
    },
    {
      title: 'Department',
      dataIndex: 'department',
      render: id => {
        return id.map(item => {
          return <p>{item.name}</p>;
        });
      },
    },
    {
      title: 'Phone Number',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
    },
    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
    },
    {
      title: 'Edit',
      dataIndex: '_id',
      render: id => {
        return (
          <i
            class="fa-solid fa-pen-to-square"
            onClick={() => navigate(`/admin/hospital/edit/${id}`)}
          ></i>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: '_id',
      width: '3%',
      render: key => {
        return <i class="fa-solid fa-trash" onClick={() => onDelete(key)}></i>;
      },
    },
  ];
  return (
    <AdminLayout heading="Hospitals">
      <div className="add-hospital">
        <Button
          color="blue"
          variant="solid"
          onClick={() => {
            navigate('/admin/hospital/add');
          }}
        >
          Add Hospital
        </Button>
      </div>
      <Table
        className="hpt-table"
        borderColor="red"
        columns={coloumn}
        dataSource={hospital}
      ></Table>
    </AdminLayout>
  );
};
export default Hospital;
