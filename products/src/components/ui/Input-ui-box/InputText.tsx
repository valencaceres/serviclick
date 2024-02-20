import { Input } from "../input-ui";
import { Label } from "../label-ui";
import { cn } from "@/lib/cn";
type InputTextT = {
  id?: string;
  label?: string;
  width?: string;
  type?: string;
  value: string;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  icon?: string;
  display?: boolean;
  onClick?: any;
  maxLength?: number;
  isValid?: boolean;
  isCompleted?: boolean;
  disabled?: boolean;
};
const InputText = ({
  id,
  label,
  width = "100%",
  type = "text",
  value,
  onChange,
  onFocus = () => {},
  onBlur = () => {},
  icon,
  display = true,
  onClick,
  maxLength,
  isCompleted,
  isValid = true,
  disabled = false,
}: InputTextT) => {
  let iconName;

  const additionalClassesInput = isCompleted
    ? "bg-sky-100 font-semibold text-black "
    : "";
  const additionalClassesLabel = isCompleted ? "font-bold text-black " : "";
  const ValidClassesInput = isValid ? "border-gray-300" : "border-red-500";
  const ValidClassesLabel = isValid ? "text-gray-500" : "text-red-500";
  return (
    <div className="relative" style={{ width }}>
      <Input
        className={cn(
          "block h-[52px] w-full border border-gray-300 rounded-md py-2 px-3 mb-1",
          additionalClassesInput,
          ValidClassesInput
        )}
        type={type}
        autoComplete="none"
        id={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder=""
        style={{ display: display ? "block" : "none" }}
        maxLength={maxLength}
        disabled={disabled}
      />
      {icon && display && (
        <span className="material-icons md-36">{iconName}</span>
      )}
      {label && display && (
        <Label
          htmlFor={id}
          className={cn(
            "absolute top-1 left-1 px-2 -z-10 -mt-px bg-white text-gray-500 text-xs",
            additionalClassesLabel,
            ValidClassesLabel
          )}
        >
          {label}
        </Label>
      )}
    </div>
  );
};

export default InputText;
