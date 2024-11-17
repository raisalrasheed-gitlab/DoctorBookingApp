import { Input } from 'antd';
import './custom-input.css';

const CustomInput = ({ label, type, className, onChange }) => {
  return (
    <>
      <div className="custom-input {className}">
        <label className="custom-label">{label}</label>
        <Input type={type} className="custom-input" onChange={onChange}></Input>
      </div>
    </>
  );
};
export default CustomInput;
