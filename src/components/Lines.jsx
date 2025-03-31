import Line from "./elements/Line";
import Area from "./elements/Area";
import PropTypes from "prop-types";

const Lines = ({ resolution, lines }) => {
  const { vt1, vt2, ht, vb1, vb2, hb } = lines;
  return (
    <>
      <Line resolution={resolution} pos={vt1} vertical={true} top={true} />
      <Line resolution={resolution} pos={vt2} vertical={true} top={true} />
      <Line resolution={resolution} pos={ht} vertical={false} top={true} />
      <Line resolution={resolution} pos={vb1} vertical={true} top={false} />
      <Line resolution={resolution} pos={vb2} vertical={true} top={false} />
      <Line resolution={resolution} pos={hb} vertical={false} top={false} />
      <Area
        resolution={resolution}
        pos={{ x1: vt1, x2: vt2, y: ht }}
        top={true}
      />{" "}
      <Area
        resolution={resolution}
        pos={{ x1: vb1, x2: vb2, y: hb }}
        top={false}
      />
    </>
  );
};
Lines.propTypes = {
  resolution: PropTypes.number.isRequired,
  lines: PropTypes.shape({
    vt1: PropTypes.number.isRequired,
    vt2: PropTypes.number.isRequired,
    ht: PropTypes.number.isRequired,
    vb1: PropTypes.number.isRequired,
    vb2: PropTypes.number.isRequired,
    hb: PropTypes.number.isRequired,
  }).isRequired,
};

export default Lines;
