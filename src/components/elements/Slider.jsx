const Slider = ({ label, ...props }) => {
  return (
    <div className="flex">
      <p className="text-xs text-center">{label}</p>
      <input
        type="range"
        {...props}
        className="accent-slate-500 dark:accent-lime-600"
      />
    </div>
  );
};

export default Slider;
