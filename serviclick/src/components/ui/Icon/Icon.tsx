type IconT = {
  iconName: string;
  className?: string;
  onClick?: any;
};

const Icon = ({ iconName, className, onClick }: IconT) => {
  return (
    <span
      className={`${className} material-symbols-outlined`}
      onClick={onClick}
    >
      {iconName}
    </span>
  );
};

export default Icon;
