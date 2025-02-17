import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
const Footer = () => {
  return (
    <>
      <div className="p-5 h-fit bg-[#1f1f1f] text-white flex flex-col  ">
        <div className="flex justify-around items-center mt-10 flex-col lg:flex-row gap-5 ">
          <div className="2xl:w-1/4">
            <div className="p-5 flex items-center ont-logo font-black text-3xl [text-shadow:_0_1px_2px_white] text-[#045ec0] ">
              <span className=" text-4xl p-1 align-super">Q</span>uick
              Appoinment
            </div>
            <p className="text-center">
              QuickoBook is a registered start up company empaneled with 10000+
              Doctors, 500+ Hospitals, lives touched of more than 2 Million
              patients.
            </p>
            <div className="flex gap-5 justify-center items-center mt-2">
              <FaFacebookF />
              <FaInstagram />
              <FaTwitter />
            </div>
          </div>
          <div>
            <h2>For Information</h2>
          </div>
          <div>
            <h2>Helpful Links</h2>
          </div>
          <div>
            <h2>Conatct Us</h2>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
