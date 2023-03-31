type IconT = {
  iconName: string;
  className?: string;
  onClick?: any;
  size?: string;
  button?: boolean;
};

const Icon = ({
  iconName,
  className,
  onClick,
  size = "24px",
  button = false,
}: IconT) => {
  return (
    <span
      className={`${className} material-symbols-outlined select-none`}
      onClick={onClick}
      style={{ fontSize: size, cursor: button ? "pointer" : "default" }}
    >
      {iconName}
    </span>
  );
};

export default Icon;
