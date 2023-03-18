import Icon from "../Icon";

type InputTextT = {
  id?: string;
  label: string;
  width?: string;
  value: string;
  onChange?: any;
  disabled?: boolean;
  className?: any;
};

const InputFile = ({
  id,
  label,
  width,
  value,
  onChange,
  disabled = false,
  className,
}: InputTextT) => {
  let iconName;

  return (
    <label
      className={`relative flex h-[50px] cursor-pointer items-center justify-center rounded-[3px] border border-tertiary-500 border-opacity-50 ${width} ${className}`}
      htmlFor={id}
    >
      <p className="absolute top-0 left-0 cursor-pointer pl-[14px] text-[12px] font-semibold text-tertiary-500">
        {label}
      </p>
      <p className="absolute left-0 bottom-0 p-[14px] pb-[7px] font-medium text-[#666666]">
        {value ? value : "Seleccione un archivo CSV"}
      </p>
      <input
        type={"file"}
        autoComplete="none"
        id={id}
        value={value}
        onChange={onChange}
        placeholder="Seleccione un archivo"
        className={`hidden h-full w-full cursor-pointer`}
        disabled={disabled}
      />
      <Icon
        className="absolute right-0 cursor-pointer pr-[10px]"
        iconName={"attach_file_add"}
      />
    </label>
  );
};

export default InputFile;
