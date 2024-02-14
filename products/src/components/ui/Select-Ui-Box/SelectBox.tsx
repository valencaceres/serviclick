import { Label } from "../label-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectTrigger,
} from "../select-ui";
type SelectBoxT = {
  id?: string;
  label?: string;
  width: string;
  value: string;
  onChange: (value: string) => void;
  placeHolder?: string;
  display?: boolean;
  data: any;
  dataValue: string;
  dataText: string;
  enabled?: boolean;
};

const SelectBox = ({
  id,
  label,
  width,
  value,
  onChange,
  placeHolder,
  display = true,
  data,
  dataValue,
  dataText,
  enabled = true,
}: SelectBoxT) => {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };
  return (
    <div className="relative" style={{ width }}>
      <Select
        disabled={!enabled}
        defaultValue={value}
        value={value}
        onValueChange={handleChange}
      >
        <SelectTrigger className=" h-[53px] w-full border border-gray-300 rounded-md py-2 px-3 mb-1">
          <SelectValue placeholder={placeHolder && placeHolder} />
        </SelectTrigger>
        <SelectContent className="bg-slate-50">
          {data.map((item: any, idx: number) => (
            <SelectItem key={idx} value={item[dataValue]}>
              {item[dataText]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {label && display && (
        <Label
          htmlFor={id}
          className="absolute top-1 left-1 px-2 -z-10 -mt-px bg-white text-gray-500 text-xs"
        >
          {label}
        </Label>
      )}
    </div>
  );
};

export default SelectBox;
