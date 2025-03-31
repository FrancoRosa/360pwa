import { useEffect, useState } from "react";

const Clock = ({}) => {
  const [clock, setClock] = useState(new Date());
  const dateParser = (date) => {
    return date.toLocaleString("sv");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-slate-300 dark:text-lime-300 absolute w-50 border-slite-600 border-solid border-1 rounded-md top-1 left-[550px]  z-5 [text-shadow:3px_3px_5px_black] text-center">
      {dateParser(clock)}
    </p>
  );
};
export default Clock;
