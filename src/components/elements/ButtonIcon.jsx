const ButtonIcon = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className=" cursor-pointer my-auto px-1 text-sm py-1 bg-slate-300 text-slate-800 dark:bg-lime-800 dark:hover:bg-lime-700  dark:active:bg-lime-600 dark: dark:text-lime-300 rounded-md"
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
