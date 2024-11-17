import { Input } from 'antd';

const { TextArea } = Input;

const CustomTextArea = ({ label, row, className, onChange }) => {
  return (
    <>
      <div className={className}>
        <label className="custom-label">{label}</label>
        <TextArea
          rows={row}
          className="custom-input"
          onChange={onChange}
        ></TextArea>
      </div>
    </>
  );
};
export default CustomTextArea;
