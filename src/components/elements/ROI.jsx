const ROI = ({ resolution, top = true, warning = false }) => {
  const { width, height } = resolution;
  const style = { width, height: height / 2, top: top ? 0 : height / 2 };
  return (
    <div
      className={
        "absolute border-solid " +
        (warning
          ? "border-red-600 bg-red-400 opacity-50  border-4"
          : "border-lime-600  border-2")
      }
      style={style}
    ></div>
  );
};
export default ROI;
