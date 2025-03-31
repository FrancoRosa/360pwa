import PropTypes from "prop-types";

const Line = ({ resolution, pos, vertical = true, top = true }) => {
  return (
    <div
      className={`absolute ${
        top ? "bg-fuchsia-600" : "bg-cyan-600"
      } border-solid border-1 border-white z-10`}
      style={{
        top: vertical ? (top ? 0 : resolution.height / 2) : pos,
        width: vertical ? "3px" : resolution.width,
        left: vertical ? pos : 0,
        height: vertical ? resolution.height / 2 : "3px",
      }}
    ></div>
  );
};

Line.propTypes = {
  resolution: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  pos: PropTypes.number.isRequired,
  vertical: PropTypes.bool,
  top: PropTypes.bool,
};

export default Line;
