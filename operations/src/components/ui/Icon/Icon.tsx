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
    onClick={onClick}
    style={{ fontSize: size, cursor: button ? "pointer" : "default" }}
    className={`material-symbols-outlined select-none ${className} `}
    >
      {iconName}
    </span>
  );
};

export default Icon;
