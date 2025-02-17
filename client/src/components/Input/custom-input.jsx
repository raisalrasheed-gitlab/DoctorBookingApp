import { Input } from 'antd';
import './custom-input.css';

const CustomInput = ({ label, type, onChange, value, onKey, classname }) => {
  return (
    <>
      <div>
        <label className="custom-label">{label}</label>
        <Input
          type={type}
          className="custom-input {className}"
          onChange={onChange}
          value={value}
          onKeyDown={onKey}
        ></Input>
      </div>
    </>
  );
};
export default CustomInput;
