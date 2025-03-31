import PropTypes from "prop-types";

const Area = ({ resolution, pos, top = true }) => {
  const { x1, x2, y } = pos;
  return (
    <div
      className={`absolute opacity-20 border-white z-10
      ${top ? "bg-fuchsia-600" : "bg-cyan-600"} `}
      style={{
        top: y,
        left: x1,
        width: x2 - x1,
        height: top ? resolution.height / 2 - y : resolution.height - y,
      }}
    ></div>
  );
};

Area.propTypes = {
  resolution: PropTypes.shape({
    height: PropTypes.number.isRequired,
  }).isRequired,
  pos: PropTypes.shape({
    x1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  top: PropTypes.bool,
};
export default Area;
