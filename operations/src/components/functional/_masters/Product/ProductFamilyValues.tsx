import { ContentCell } from "../../../layout/Content";

import Button from "../../../ui/Button";
import CheckBox  from "~/components/ui/CheckBox"; 

type FamilyValuesDetailT = {
  id: string;
  name: string;
  isChecked: boolean;
};

const ProductFamilyValues = ({
  familyValues,
  saveFamilyValues,
  handleCheckFamilyValue,
}: any) => {
  return (
    <ContentCell gap="30px">
      <div
        style={{
          padding: "20px",
          border: "1px solid silver",
          borderRadius: "3px",
        }}>
        {familyValues.map((value: FamilyValuesDetailT, idx: number) => (
          <CheckBox
            key={idx}
            label={value.name}
            width="auto"
            value={value.isChecked}
            onChange={() => handleCheckFamilyValue(value.id)}
          />
        ))}
      </div>
      <Button text="Registrar" width="200px" onClick={saveFamilyValues} />
    </ContentCell>
  );
};

export default ProductFamilyValues;
