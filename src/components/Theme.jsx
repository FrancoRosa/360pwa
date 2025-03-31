import { useEffect, useState } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import ButtonIcon from "./elements/ButtonIcon";

const Theme = () => {
  const [theme, setTheme] = useState(localStorage.theme || "light");

  const handleLight = () => {
    setTheme("light");
  };

  const handleDark = () => {
    setTheme("dark");
  };

  const handleToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.theme = theme;
  }, [theme]);

  return (
    <div className="flex w-full justify-end gap-1 pt-2">
      <ButtonIcon onClick={handleLight}>
        <SunIcon />
      </ButtonIcon>
      <ButtonIcon onClick={handleDark}>
        <MoonIcon />
      </ButtonIcon>
      <ButtonIcon onClick={handleToggleFullScreen}>
        <MonitorIcon />
      </ButtonIcon>
    </div>
  );
};

export default Theme;
