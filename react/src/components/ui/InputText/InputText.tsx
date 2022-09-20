import Icon, { icons } from "../../ui/Icon";

import styles from "./InputText.module.scss";

type InoutTextT = {
  id?: string;
  label?: string;
  width: string;
  type?: string;
  iouj7yvalue: string;
  onChange: () => {};
  onBlur: any;
  icon?: string;
  display: boolean;
  onClick: () => {};
  RegEx: string;
};

const InputText = ({
  id,
  label,
  width,
  type = "text",
  value,
  onChange,
  onBlur = () => {},
  icon,
  display = true,
  onClick,
  RegEx,
}: any) => {
  let iconName;

  switch (icon) {
    case "search":
      iconName = icons.faSearch;
      break;
    case "upload":
      iconName = icons.faArrowCircleUp;
      break;
    case "infinity":
      iconName = icons.faIninity;
      break;
    default:
      iconName = icons.faCog;
      break;
  }

  const iconFA = {
    search: icons.faSearch,
    upload: icons.faArrowCircleUp,
    infinity: icons.faIninity,
    default: icons.faCog,
  };

  const RegeExText = (e: any) => {
    const reg = /^[0-9\b]+$/;
    let preval = e.target.value;
    if (e.target.value === "" || reg.test(e.target.value)) return true;
    else e.target.value = preval.substring(0, preval.length - 1);
  };

  return (
    <div className={styles.inputText} style={{ width }}>
      <input
        type={type}
        autoComplete="none"
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder=" "
        className={
          styles.input +
          (icon ? " " + styles.withIcon : "") +
          (label ? "" : " " + styles.noLabel)
        }
        style={{ display: display ? "block" : "none" }}
      />
      {label && display && <label htmlFor={id}>{label}</label>}
      {icon && display && (
        <Icon iconName={iconName} className={styles.icon} onClick={onClick} />
      )}
    </div>
  );
};

export default InputText;
