import UserLayout from '../../components/UserLayout/userLayout';
import DepartmentCard from '../../components/DepartmentCard/departmentCard';
import Footer from '../../components/Footer/footer';
import { Select } from 'antd';
import Cardiology from '../../assets/images/cardiology.png';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';

const Department = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getDepartment();
  }, []);
  const getDepartment = async () => {
    const department = await axios.get(`/hospital/department/${id}`);
    setDepartment(department.data);
  };
  const onDoctor = (hId, dId) => {
    navigate(`/user/search/doctor/department/booking/${hId}/${dId}`);
  };
  return (
    <>
      <UserLayout />
      <div className="hidden xl:flex bg-blue-500 h-12 mt-1  items-center gap-8  justify-center border-b-2 border-gray-300">
        Location <Select className="w-64 " />
        Hospital <Select className="w-64" />
        Department <Select className="w-64" />
      </div>
      <div className="min-h-32 bg-blue-500 flex  2xl:mt-0  justify-center flex-col xl:items-center  gap-4 font-inter">
        <h3 className="text-3xl font-medium pt-4 pl-4 ">Our Departments</h3>
        <p className="max-w-[900px] px-4 pb-4 text-white">
          There are different specialties or super specialties in the centre.
          This with a team of expert doctors and advanced facilities makes
          Hospital one of the best multi-specialty hospitals in Kerala.
        </p>
      </div>
      <div className="mt-5 w-10/12 min-h-[71vh] pb-5 mx-auto xl:grid 2xl:grid-cols-3 md:grid-cols-2 gap-2 justify-items-center">
        {department
          ? department[0].deptDetails.map(element => {
              return (
                <DepartmentCard
                  onClick={() => onDoctor(id, element._id)}
                  name={element.name}
                  about={element.about}
                />
              );
            })
          : ''}
      </div>

      <Footer />
    </>
  );
};
export default Department;
