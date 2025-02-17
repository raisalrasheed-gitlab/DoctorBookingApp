import AddHospitals from '../../../components/AdminLayout/admin-layout';
import Custominput from '../../../components/Input/custom-input';
import CustomSelect from '../../../components/Select/custom-select';
import CustomTextArea from '../../../components/TextArea/custom-textarea';
import './add-hospital.css';
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import axios from '../../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
const AddHospital = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState([]);
  const [location, setLocation] = useState([]);
  const [error, setError] = useState(false);
  const [hospital, setHospital] = useState({
    name: '',
    location: '',
    about: '',
    phonenumber: '',
    image: '',
    reviews: [],
    department: [],
  });
  useEffect(() => {
    if (id) {
      getHospital();
    }
    getDepartment();
    getLocation();
  }, []);
  const getHospital = async () => {
    const dbResponse = await axios.get(`/hospital/${id}`);
    setHospital(dbResponse.data);
  };
  console.log(hospital);
  const getDepartment = async () => {
    const department = await axios.get('/department');
    const departmentOption = department.data.map(item => {
      return { label: item.name, value: item._id };
    });
    setDepartment(departmentOption);
  };
  const getLocation = async () => {
    const dbResponse = await axios.get('/location');
    const departmentOption = dbResponse.data.map(item => {
      return { label: item.name, value: item._id };
    });
    setLocation(departmentOption);
  };
  const onImageChange = async e => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const dbResponse = await axios.post('/image/upload', formData);
    setHospital({ ...hospital, image: dbResponse.data.url });
  };
  const onChange = (e, key) => {
    if ([key] == 'department' || [key] == 'location') {
      setHospital({ ...hospital, [key]: e });
    } else setHospital({ ...hospital, [key]: e.target.value });
    setError(false);
  };
  console.log(hospital);
  const onSubmit = async () => {
    try {
      const dbResponse = await axios.post('/hospital', hospital);
      navigate('/admin/hospital');
    } catch (error) {
      setError(true);
    }
  };
  const onEdit = async () => {
    try {
      console.log('enter');
      const dbResponse = await axios.patch(`/hospital/${id}`, hospital);
      navigate('/admin/hospital');
      console.log(dbResponse);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <AddHospitals heading={id ? 'Edit Hospital' : 'Add Hospital'}>
        <div className="add-hospital-main">
          <div className="h1">
            <Custominput
              label="Name"
              value={hospital.name}
              onChange={e => onChange(e, 'name')}
            ></Custominput>
          </div>
          <div className="h2">
            <CustomSelect
              label="Location"
              value={hospital.location}
              option={location}
              onChange={e => onChange(e, 'location')}
            />
          </div>
          <div className="h3">
            <CustomTextArea
              label="About"
              value={hospital.about}
              onChange={e => {
                onChange(e, 'about');
              }}
            ></CustomTextArea>
          </div>
          <div>
            <Custominput
              className="h4"
              label="PhoneNumber"
              value={hospital.phonenumber}
              onChange={e => {
                onChange(e, 'phonenumber');
              }}
            ></Custominput>
          </div>
          <div className="h5">
            <CustomSelect
              mode="multiple"
              label="Department"
              option={department}
              onChange={e => onChange(e, 'department')}
            ></CustomSelect>
          </div>
          <div className="h6">
            <Custominput label="Review"></Custominput>
          </div>
          <div className="h7">
            <Custominput
              label="Image"
              type="file"
              onChange={e => onImageChange(e)}
            ></Custominput>
          </div>
          <div className="h8-button">
            <Button
              color="blue"
              variant="solid"
              onClick={id ? () => onEdit() : () => onSubmit()}
            >
              {id ? 'Edit Hospital' : 'Add Hospital'}
            </Button>
            {error ? <p>"please fill complete details..."</p> : ''}
          </div>
          <div>
            <img
              width="250px"
              style={{ marginLeft: '30px' }}
              src={hospital.image}
            ></img>
          </div>
        </div>
      </AddHospitals>
    </>
  );
};
export default AddHospital;
