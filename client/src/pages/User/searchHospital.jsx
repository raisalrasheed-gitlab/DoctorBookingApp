import UserLayout from '../../components/UserLayout/userLayout';
import Footer from '../../components/Footer/footer.jsx';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';
import { Select } from 'antd';
import { FaRegHospital } from 'react-icons/fa';
import HospitalCard from '../../components/HospitalCard/card.jsx';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';

const SearchHospital = () => {
  const { id } = useParams();
  const [location, setLocation] = useState();
  const [locationId, setLocationId] = useState(id);
  const [hospital, setHospital] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Location();
    getHospital();
  }, [locationId]);

  const getHospital = async () => {
    const dbResponse = await axios.get(`/hospital/location/${locationId}`);
    setHospital(dbResponse.data);
  };

  const Location = async () => {
    const dbResponse = await axios.get('/location');
    const dbOption = dbResponse.data.map(item => {
      return { label: item.name, value: item._id };
    });
    setLocation(dbOption);
  };
  const onLocation = e => {
    setLocationId(e);
  };
  const onDepartment = id => {
    navigate(`/user/search/hospital/department/${id}`);
  };
  return (
    <>
      <UserLayout />
      <div className="h-24 sm:h-20 font-inter bg-blue-600 flex items-center justify-evenly  font-medium text-black">
        <div className="hidden md:block">
          <h2 className="text-xl font-bold text-white font-jost">
            Showing {hospital.length} results....
          </h2>
        </div>
        <div className="flex sm:gap-10 gap-2 flex-col sm:flex-row">
          <div className="relative flex gap-3 items-center ">
            <h2 className="text-sm font-semibold">Location</h2>
            <Select
              className="xl:w-60 sm:w-40 w-60 text-center"
              defaultValue={id}
              options={location}
              onChange={onLocation}
            />
            <FaLocationDot className="absolute text-xl left-20  rounded-l-md text-red-800 " />
          </div>
          <div className="flex gap-2 items-center relative">
            <h2 className="text-sm font-semibold">Hospitals</h2>
            <Select className="xl:w-60 sm:w-40 w-60 " />
            <FaRegHospital className="absolute left-20 text-xl" />
          </div>
        </div>
      </div>
      <div className=" mb-10 w-11/12 min-h-[78vh] mx-auto grid xl:grid-cols-3 justify-items-center gap-8 md:grid-cols-2 ">
        {hospital ? (
          hospital.map(item => {
            return (
              <HospitalCard
                name={item.name}
                about={item.about}
                img={item.image}
                onClick={() => {
                  onDepartment(item._id);
                }}
              />
            );
          })
        ) : (
          <HospitalCard />
        )}
      </div>
      <Footer />
    </>
  );
};
export default SearchHospital;
