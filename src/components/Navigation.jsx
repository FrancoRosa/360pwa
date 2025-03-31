import { ArrowBigLeft, CogIcon, FileBarChart2Icon } from "lucide-react";
import Theme from "./Theme";
import PropTypes from "prop-types";
import ButtonIcon from "./elements/ButtonIcon";
// import { start, stop, keep } from "../js/record";
// import Button from "./elements/Button";

const Navigation = ({ page, setPage }) => {
  return (
    <div className="flex justify-between w-full absolute bottom-0 z-10 p-2">
      <div className="flex justify-around">
        {page === "main" ? (
          <div className="flex gap-1">
            <ButtonIcon onClick={() => setPage("reports")}>
              <FileBarChart2Icon />
            </ButtonIcon>
            <ButtonIcon onClick={() => setPage("config")}>
              <CogIcon />
            </ButtonIcon>
          </div>
        ) : (
          <ButtonIcon onClick={() => setPage("main")}>
            <ArrowBigLeft />
          </ButtonIcon>
        )}
        {/* <div className="flex gap-2 ml-2">
          <Button label="record" onClick={() => start("video.mp4")} />
          <Button label="stop" onClick={() => stop()} />
          <Button label="keep" onClick={() => keep()} />
        </div> */}
      </div>
      <Theme />
    </div>
  );
};

Navigation.propTypes = {
  page: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Navigation;
