import AdminLayout from '../../../components/AdminLayout/admin-layout';
import CustomInput from '../../../components/Input/custom-input';
import CustomSelect from '../../../components/Select/custom-select';
import CustomTextArea from '../../../components/TextArea/custom-textarea';
import './add-doctor.css';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';
const AddDoctor = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    firstname: '',
    lastname: '',
    email: '',
    about: '',
    specialization: '',
    department: '',
    hospital: '',
    image: '',
  });
  const [department, setDepartment] = useState([]);
  const [hospital, setHospital] = useState([]);
  useEffect(() => {
    getDepartment();
    getHospital();
  }, []);
  const getDepartment = async () => {
    const department = await axios.get('/department');
    const departmentOption = department.data.map(item => {
      return { label: item.name, value: item._id };
    });
    setDepartment(departmentOption);
  };
  const getHospital = async () => {
    const hospital = await axios.get('/hospital');
    const hospitalOption = hospital.data.map(item => {
      return { value: item._id, label: item.name };
    });
    setHospital(hospitalOption);
  };
  const onChange = (e, key) => {
    if ([key] == 'department' || [key] == 'hospital') {
      setDoctor({ ...doctor, [key]: e });
    } else {
      setDoctor({ ...doctor, [key]: e.target.value });
    }
  };
  const onImageChange = async e => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const dbResponse = await axios.post('/image/upload', formData);
    setDoctor({ ...doctor, image: dbResponse.data.url });
  };
  console.log(doctor);

  const onSubmit = async () => {
    const dbResponse = await axios.post('/doctor/signup', doctor);
    navigate('/admin/doctor');
  };
  return (
    <>
      <AdminLayout heading="Doctor Signup Page">
        <div className="add-doctor-form">
          <CustomInput
            className="add-doctor-box-1"
            label="FisrtName"
            onChange={e => {
              onChange(e, 'firstname');
            }}
          ></CustomInput>
          <CustomInput
            className="add-doctor-box-2"
            label="LastName"
            onChange={e => {
              onChange(e, 'lastname');
            }}
          ></CustomInput>
          <CustomInput
            label="Email"
            onChange={e => {
              onChange(e, 'email');
            }}
          ></CustomInput>
          <CustomInput
            label="Specialization"
            onChange={e => {
              onChange(e, 'specialization');
            }}
          ></CustomInput>
          <CustomSelect
            option={department}
            label="Department"
            placeholder="Select department"
            onChange={e => onChange(e, 'department')}
          ></CustomSelect>
          <CustomSelect
            option={hospital}
            label="Hospital"
            placeholder="Select Hospital"
            onChange={e => onChange(e, 'hospital')}
          ></CustomSelect>
          <CustomTextArea
            className="add-doctor-box-8"
            label="About"
            row="5"
            onChange={e => onChange(e, 'about')}
          ></CustomTextArea>
          <CustomInput
            className="add-doctor-box-7"
            label="Image"
            type="file"
            onChange={e => {
              onImageChange(e);
            }}
          ></CustomInput>
        </div>
        <div>
          <Button
            className="add-dpt-btn"
            color="blue"
            variant="solid"
            onClick={onSubmit}
          >
            Add Doctor
          </Button>
        </div>
      </AdminLayout>
    </>
  );
};
export default AddDoctor;
