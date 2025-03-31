const Select = ({ label, ...props }) => {
  return (
    <div className="flex items-center gap-1">
      <label>{label} </label>
      <select
        className="border-slite-600 border-solid border-1 rounded-md py-1 dark:bg-lime-800 dark:text-lime-300 text-xs"
        {...props}
      >
        <option value={true}>On</option>
        <option value={false}>Off</option>
      </select>
    </div>
  );
};

export default Select;
