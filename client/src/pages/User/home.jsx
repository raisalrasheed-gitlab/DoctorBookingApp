import CustomInput from '../../components/Input/custom-input';
import UserLayout from '../../components/UserLayout/userLayout';
import Footer from '../../components/Footer/footer';
import { Button } from '@material-tailwind/react';
import { FaSearch } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Select } from 'antd';
import map from '../../assets/images/map.webp';
import doctor from '../../assets/images/doctor.webp';
import click from '../../assets/images/click.webp';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState();
  const [locationId, setLocationId] = useState();
  useEffect(() => {
    Location();
  }, []);
  const Location = async () => {
    const dbResponse = await axios.get('/location');
    const dbOption = dbResponse.data.map(item => {
      return { label: item.name, value: item._id };
    });
    setLocation(dbOption);
  };
  const selectLocation = e => {
    setLocationId(e);
  };
  const onSearch = () => {
    navigate(`/user/search/hospital/${locationId}`);
  };
  console.log(locationId);
  return (
    <>
      <UserLayout />
      <div className="md:h-96 bg-[url('assets/images/Physician-with-her-laptop-open-speaking-with-patient.jpg')] bg-no-repeat bg-cover bg-top 2xl:bg-center text-center ">
        <h2 className="font-jost text-2xl 2xl:text-4xl font-black p-10 ">
          View Doctors, Book an Appointment
        </h2>
        <p className=" 2xl:text-xl font-semibold">
          Find the best doctors, clinics & hospitals in the city nearest to you.
        </p>
        <div className="h-60 flex flex-col md:flex-row  gap-2 md:gap-5 justify-center items-center">
          <div className="relative z-0">
            <Select
              className="w-80 h-10 z-0"
              options={location}
              onChange={selectLocation}
              defaultValue="Welcome..."
            />
            <FaLocationDot className="absolute top-3 left-2" />
            <p className="text-left text-gray-900 text-sm pt-2">
              Select Location
            </p>
          </div>
          <div>
            <Button
              color="blue"
              className="mb-6  outline-none h-10 "
              onClick={onSearch}
            >
              <FaSearch className="text-sm " />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-10 gap-10 text-center">
        <h2 className="text-3xl font-black">
          Largest Healthcare Network Across In Kerala
        </h2>
        <p className="text-xl text-gray-700">
          Find best doctors across specialities or hospitals in your city.
        </p>
      </div>
      <div className="bg-[#f2f7fb] mt-5 text-center h-fit md:h-[560px] p-5">
        <div className="gap-5 flex flex-col items-center justify-center h-40">
          <h2 className="text-xl font-semibold">
            Discover the Online Appointment!
          </h2>
          <p className="text-lg">
            A step-by-step guide to build an on-demand appointment for patients
          </p>
        </div>
        <div className="flex md:flex-row flex-col justify-center items-center gap-10 ">
          <div className="md:w-1/4 w-3/4 bg-white flex flex-col justify-center items-center rounded-2xl h-80">
            <img src={map} className="w-40 h-40"></img>
            <h2 className="text-md font-semibold">FIND A DOCTOR</h2>
            <p>
              With more than 1000+ doctors and on mission to provide best care
              Health Care Service
            </p>
          </div>
          <div className="md:w-1/4 w-3/4  bg-white flex flex-col justify-center items-center rounded-2xl h-80">
            <img src={doctor} className="w-40 h-40 bg-cntain"></img>

            <h2 className="text-md font-semibold">VIEW DOCTOR</h2>
            <p>
              Share your health concern here and we shall assign you a top
              doctor across the North East
            </p>
          </div>
          <div className=" md:w-1/4 w-3/4  bg-white flex flex-col justify-center items-center rounded-2xl h-80">
            <img src={click} className="w-40 h-40 bg-cntain"></img>

            <h2 className="text-md font-semibold">BOOK A VISIT</h2>
            <p>Book your time slot with doctor from your comfort zone</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Home;
