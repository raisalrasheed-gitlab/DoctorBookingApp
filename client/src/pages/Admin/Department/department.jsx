import './department.css';
import axios from '../../../utils/axios';
import moment from 'moment';
import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/AdminLayout/admin-layout';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

const Department = () => {
  const [dpt, setDpt] = useState([]);
  const navigate = useNavigate();
  //fetching department data from database using axios
  const getDepartment = async () => {
    try {
      const dbResponse = await axios.get('http://localhost:8001/department');
      console.log(dbResponse.data);
      setDpt(dbResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  //useEffect for rendering
  useEffect(() => {
    getDepartment();
  }, []);
  //antd table columns configuration
  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
      render: id => {
        return <a>{id}</a>;
      },
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: img => {
        return <img className="table-img" src={img}></img>;
      },
      width: '10%',
    },
    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
      width: '40%',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: date => {
        return (
          <a>
            {moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format(
              'DD-MM-YY'
            )}
          </a>
        );
      },
      //   width: '20%',
    },
    {
      title: 'Edit',
      dataIndex: '_id',
      render: id => {
        return (
          <i
            className="fa-solid fa-pen-to-square table-icon-edt"
            onClick={() => {
              navigate(`/admin/department/edit/${id}`);
            }}
          ></i>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: '_id',
      key: 'delete',
      render: id => {
        return (
          <i
            className="fa-solid fa-trash table-icon-dlt"
            onClick={() => {
              onDeptDelete(id);
            }}
          ></i>
        );
      },
    },
  ];
  // department delete
  const onDeptDelete = async id => {
    try {
      const dbResponse = await axios.delete(
        `http://localhost:8001/department/${id}`
      );
      getDepartment();
      console.log(dbResponse);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminLayout heading="Department">
      <div className="dept-add-btn">
        <Button
          color="blue"
          variant="solid"
          onClick={() => {
            navigate('/admin/department/add');
          }}
        >
          Add Department
        </Button>
      </div>
      {/* data source and column detals */}
      <Table
        columns={columns}
        dataSource={dpt}
        className="dpt-table"
        borderColor="red"
      ></Table>
    </AdminLayout>
  );
};
export default Department;
