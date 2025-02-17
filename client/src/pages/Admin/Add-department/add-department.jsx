import AddDepartment from '../../../components/AdminLayout/admin-layout';
import CustomInput from '../../../components/Input/custom-input';
import CustomTextArea from '../../../components/TextArea/custom-textarea';
import { Button } from 'antd';
import './add-department.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const addDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [department, setDepartment] = useState({
    name: '',
    about: '',
    image: '',
  });

  useEffect(() => {
    if (id) {
      getDepartment();
    }
  }, []);
  const getDepartment = async () => {
    try {
      console.log('fn running');
      const dbResponse = await axios.get(
        `http://localhost:8001/department/${id}`
      );
      setDepartment(dbResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(department);
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
  const onEditDepartment = async () => {
    const dbResponse = await axios.patch(
      `http://localhost:8001/department/${id}`,
      department
    );
    navigate('/admin/department');
  };
  return (
    <AddDepartment
      heading={id ? 'Edit Department Page' : 'Department Adding Page'}
    >
      <i
        class="fa-regular fa-circle-xmark dpt-close"
        onClick={() => navigate('/admin/department')}
      ></i>
      <div className="add-dpt-form">
        <CustomInput
          onChange={e => onChange(e.target.value, 'name')}
          label="Name"
          type="text"
          className="dpt-box1"
          value={department.name}
        ></CustomInput>
        <CustomTextArea
          label="About"
          className="dpt-box2"
          row="10"
          onChange={e => {
            return onChange(e.target.value, 'about');
          }}
          value={department.about}
        ></CustomTextArea>
        <div className="admin-dpt-edit-img">
          <CustomInput
            label="Image"
            type="file"
            className="dpt-box3"
            onChange={e => onImageChange(e)}
          ></CustomInput>
          <img src={department.image}></img>
        </div>
        <Button
          onClick={id ? onEditDepartment : onAddDepartment}
          className="add-dpt-btn"
          color="blue"
          variant="solid"
        >
          {id ? 'Edit Department' : 'Add Department'}
        </Button>
      </div>
    </AddDepartment>
  );
};
export default addDepartment;
