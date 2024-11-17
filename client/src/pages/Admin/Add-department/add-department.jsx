import AddDepartment from '../../../components/AdminLayout/admin-layout';
import CustomInput from '../../../components/Input/custom-input';
import CustomTextArea from '../../../components/TextArea/custom-textarea';
import { Button } from 'antd';
import './add-department.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const addDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log('new', id);
  const [department, setDepartment] = useState({
    name: '',
    about: '',
    image: '',
  });
  const onChange = (e, key) => {
    setDepartment({ ...department, [key]: e });
    console.log(department);
  };
  const onImageChange = async e => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const dpResponse = await axios.post(
      'http://localhost:8001/image/upload',
      formData
    );
    setDepartment({ ...department, image: dpResponse.data.url });
  };
  const onAddDepartment = async () => {
    const dpResponse = await axios.post(
      'http://localhost:8001/department',
      department
    );
    navigate('/admin/department');
  };
  return (
    <AddDepartment
      heading={id ? 'Edit Department Page' : 'Department Adding Page'}
    >
      <div className="add-dpt-form">
        <CustomInput
          onChange={e => onChange(e.target.value, 'name')}
          label="Name"
          type="text"
          className="dpt-box1"
        ></CustomInput>
        <CustomTextArea
          label="About"
          className="dpt-box2"
          row="10"
          onChange={e => {
            return onChange(e.target.value, 'about');
          }}
        ></CustomTextArea>
        <CustomInput
          label="Image"
          type="file"
          className="dpt-box3"
          onChange={e => onImageChange(e)}
        ></CustomInput>
        <Button
          onClick={onAddDepartment}
          className="add-dpt-btn"
          color="blue"
          variant="solid"
        >
          Add Department
        </Button>
      </div>
    </AddDepartment>
  );
};
export default addDepartment;
