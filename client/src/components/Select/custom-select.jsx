import { Select } from 'antd';
import './custom-select.css';

const CustomSelect = ({ label, type, onChange, option, mode, placeholder }) => {
  return (
    <>
      <div>
        <label className="custom-label">{label}</label>
        <Select
          mode={mode}
          className="custom-select"
          showSearch
          placeholder={placeholder}
          options={option}
          onChange={onChange}
          allowClear
        ></Select>
      </div>
    </>
  );
};
export default CustomSelect;
