import './location.css';
import AdminLayout from '../../../components/AdminLayout/admin-layout';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../../components/Input/custom-input';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
const Location = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [option, setOption] = useState(false);
  const [name, setName] = useState({ name: '' });
  const [locations, setLocations] = useState([]);
  const [gid, setId] = useState();
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = async () => {
    const location = await axios.get('/location');
    setLocations(location.data);
    setOption(false);
    setId(false);
    setName('');
  };
  const coloumn = [
    { title: 'Id', dataIndex: '_id', key: '_id', width: '35%' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Created',
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
    },
    {
      title: 'Edit',
      dataIndex: '_id',
      width: '10%',
      render: id => {
        return (
          <i
            class="fa-solid fa-pen-to-square"
            onClick={() => onEdit(id, 'edit')}
          ></i>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: '_id',
      width: '10%',
      render: id => {
        return (
          <i
            class="fa-solid fa-trash"
            style={{ fontSize: '20px' }}
            onClick={() => onDelete(id)}
          ></i>
        );
      },
    },
  ];
  const onChange = e => {
    setName({ name: e.target.value.toUpperCase() });
  };
  const onLocation = async () => {
    toast('adding locations');
    const location = await axios.post('/location', name);
    getLocation();
    setToggle(false);
  };
  const onDelete = async id => {
    const response = await axios.delete(`/location/${id}`);
    getLocation();
  };
  const onEdit = (id, check) => {
    if (check == 'edit') {
      getSingleLocation(id);
      setToggle(true);
      setOption('Edit');
    } else {
      setToggle(true);
      setOption('Add Location');
    }
  };
  const onUpdate = async id => {
    toast('updating location');
    const dbResponse = await axios.patch(`/location/${id}`, name);
    getLocation();
    setToggle(false);
    setName('');
  };
  const getSingleLocation = async id => {
    const dbResponse = await axios.get(`/location/${id}`);
    setId(id);
    setName(dbResponse.data);
  };

  return (
    <>
      <AdminLayout heading="Locations">
        <ToastContainer />
        <div className="add-location">
          <Button color="blue" variant="solid" onClick={() => onEdit('add')}>
            Add Location
          </Button>
        </div>
        {toggle ? (
          <div className="add-location-box">
            <h3>{option}</h3>
            <i
              class="fa-solid fa-x"
              style={{ marginLeft: '20px' }}
              onClick={() => {
                setToggle(false);
              }}
            ></i>
            <div className="input">
              <CustomInput
                label="Name"
                value={name.name}
                onChange={e => onChange(e)}
              ></CustomInput>
            </div>
            <div className="button-div">
              <Button
                color="blue"
                variant="solid"
                onClick={gid ? () => onUpdate(gid) : () => onLocation()}
              >
                {option}
              </Button>
            </div>
          </div>
        ) : (
          ''
        )}
        <Table
          className="loc-table"
          columns={coloumn}
          dataSource={locations}
        ></Table>
      </AdminLayout>
    </>
  );
};
export default Location;
