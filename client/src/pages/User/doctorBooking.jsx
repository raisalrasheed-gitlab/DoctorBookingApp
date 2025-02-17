import { useParams } from 'react-router-dom';
import UserLayout from '../../components/UserLayout/userLayout';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { Checkbox } from '@material-tailwind/react';

const DoctorBooking = () => {
  const { hId, dId } = useParams();
  const [slot, setSlot] = useState([]);
  const [save, setSave] = useState([]);
  console.log(hId);
  const [doctor, setDoctor] = useState({});
  useEffect(() => {
    getDoctor();
  }, []);

  const getDoctor = async () => {
    const dbResponse = await axios.get(`/doctor/${hId}/${dId}`);
    setDoctor(dbResponse.data);
    getSlot();
  };
  const getSlot = async () => {
    const dbResponse = await axios.get(`/slot/get/${doctor._id}`);
    setSlot(dbResponse.data);
  };
  console.log(slot);
  const onSelect = (i, e) => {
    const justSave = [...slot];
    justSave[i].isBooked = e.target.checked;
    setSave(justSave);
  };
  console.log(save);
  const submit = async () => {
    const dbResponse = await axios.post(`/slot/add/${doctor._id}`, save);
    console.log(dbResponse.data);
    setSlot(dbResponse.data.slot);
    getDoctor();
  };

  return (
    <>
      <UserLayout />
      {/* <div className="h-16 bg-blue-400"></div> */}
      <div className="bg-[#f4f8fb] font-jost">
        <div className=" w-11/12 xl:h-[90vh] mx-auto xl:flex gap-20 pt-10 grid items-center justify-items-center">
          <div className=" w-full sm:w-80 h-[70vh] border-2 border-black flex flex-col items-center gap-12">
            <img alt="error" className="mt-2 rounded-3xl"></img>
            <div className="pl-5 grid gap-2">
              <h2 className="text-lg font-semibold flex gap-2 items-center">
                Name:
                <p className="text-base font-medium">
                  {doctor.firstname}_{doctor.lastname}
                </p>
              </h2>
              <h3 className="text-lg font-semibold  flex gap-2 items-center">
                Email:<p className="text-base font-medium"> {doctor.email}</p>
              </h3>
              <h3 className="text-lg font-semibold flex gap-2 items-center">
                Specialization:
                <p className="text-base font-medium">{doctor.specialization}</p>
              </h3>
              <h3 className="text-lg font-semibold  flex gap-2 items-center">
                Phone number:
                <p className="text-base font-medium">Not available</p>
              </h3>
              <p className="text-lg font-medium flex gap-2 items-center">
                About:<p className="text-base font-medium">{doctor.about}</p>
              </p>
            </div>
          </div>
          <div className="xl:w-[130vh] w-full border-2 h-[90vh] p-2">
            <div className="bg-white w-full h-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex items-center rounded-md">
              <h2 className="ml-10 bg-blue-400 p-2 px-8 rounded-md">
                {doctor.hospital ? doctor.hospital.name : ''}
              </h2>
            </div>
            <div className="grid grid-cols-2 mt-10 px-10 ">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Address of doctor
                </h3>
              </div>
              <div className="flex flex-col gap-5 text-xl font-medium pb-5">
                <h3>Docter Fee:500 Rs</h3>
                <h4>Booking Charge :49 Rs</h4>
              </div>
            </div>
            <div className="h-12 bg-blue-400 mt-5 text-white flex items-center justify-center text-xl font-semibold">
              Select your date
            </div>
            {/* <div className="flex justify-center mt-5 gap-5">
              <div className="bg-black text-white p-2">date pick</div>
              <div className="bg-black text-white p-2">date pick</div>
            </div> */}
            <div className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-5 gap-5 justify-evenly  mt-20 text-center">
              {slot
                ? slot.map((item, i) => {
                    return (
                      <span className="relative ">
                        <div
                          className={
                            item.isBooked
                              ? 'bg-red-800 p-3 cursor-pointer text-white'
                              : 'bg-green-800 p-3 cursor-pointer'
                          }
                        >
                          {item.time}
                        </div>
                        <Checkbox
                          defaultChecked={item.isBooked}
                          // ripple={false}
                          onClick={e => {
                            onSelect(i, e);
                          }}
                          className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                        />
                      </span>
                    );
                  })
                : ''}
            </div>
            <div className="flex justify-center mt-10">
              <button
                className="bg-blue-600 w-40 p-2 rounded-lg text-white"
                onClick={submit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DoctorBooking;
