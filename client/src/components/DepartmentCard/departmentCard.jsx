const DepartmentCard = ({ img, name, about, onClick }) => {
  return (
    <>
      <div
        className="p-4 gap-1 max-w-[356px] font-inter sm:h-52 h-full mt-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] justify-center flex flex-col items-center rounded-xl hover:bg-blue-300 "
        onClick={onClick}
      >
        <img src={img} />
        <h2>{name}</h2>
        <p className="text-sm font-light ">{about}</p>
      </div>
    </>
  );
};
export default DepartmentCard;
