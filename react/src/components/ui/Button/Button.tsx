import { Fragment } from "react";

import Icon, { icons } from "../../ui/Icon";

const Button = ({
  text,
  onClick,
  icon,
  width,
  enabled = true,
  type,
  loading = false,
}: any) => {
  let iconName;

  switch (icon) {
    case "search":
      iconName = icons.faSearch;
      break;
    case "plus":
      iconName = icons.faPlus;
      break;
    case "pen":
      iconName = icons.faPen;
      break;
    default:
      iconName = icons.faCog;
      break;
  }

  return (
    <button
      style={{ width: text === "" ? "40px" : width }}
      className={`
        flex items-center justify-center gap-[10px]
        h-[40px]
        rounded-full 
        font-semibold 
        transition duration-300
        active:scale-90
        disabled:bg-general-lightGray
        disabled:text-general-gray 
        [&>*]:disabled:text-general-gray
        ${
          type === "sub"
            ? `bg-general-lightGray 
               text-general-darkGray 
               [&>*]:text-general-darkGray`
            : "bg-general-blue text-general-white "
        }`}
      onClick={onClick}
      disabled={!enabled}
    >
      <Fragment>
        {icon && (
          <Icon
            iconName={iconName}
            className={`
              ${type === "sub" ? "text-general-gray" : "text-general-white "}`}
          />
        )}
        {loading ? (
          <div className="flex items-center justify-center gap-[10px]">
            <Icon
              iconName={icons.faSpinner}
              className={`animate-spin inline-block`}
            />{" "}
            Espere...
          </div>
        ) : (
          text
        )}
      </Fragment>
    </button>
  );
};

export default Button;
