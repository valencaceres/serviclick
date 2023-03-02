import { useState } from "react";
import { ContentCell } from "../../../layout/Content";

import Button from "../../../ui/Button";
import ComboBox from "../../../ui/ComboBox";

import { useDistrict } from "../../../../hooks";
import { useSpecialist } from "../../../../store/hooks";

const SpecialistSpecialtiesList = ({ setShow }: any) => {
  const { list } = useDistrict();
  const { specialist, setSpecialist } = useSpecialist();

  const initialData = {
    family_id: "",
    family_name: "",
    specialty_id: "",
    specialty_name: "",
  };

  const [specialityItem, setSpecialityItem] = useState(initialData);

  const handleChangeDistrict = (e: any) => {
    setSpecialityItem({
      ...specialityItem,
      specialty_id: e.target.value,
      specialty_name: e.target.options[e.target.selectedIndex].text,
    });
  };

  const handleClickAdd = () => {
    setSpecialist({
      ...specialist,
      districts: [
        ...specialist.districts,
        {
          id: specialityItem.specialty_id,
          region_number: 0,
          region_name: "",
          province_name: "",
          district_name: specialityItem.specialty_name,
        },
      ],
    });
    setSpecialityItem(initialData);
    setShow(false);
  };

  return (
    <ContentCell gap="20px">
      <ComboBox
        id="cmbDistrict"
        label="Comuna"
        width="300px"
        value={specialityItem.family_id}
        onChange={handleChangeDistrict}
        placeHolder=":: Seleccione comuna ::"
        data={list || []}
        dataValue="id"
        dataText="name"
      />
      <Button text="Agregar" onClick={handleClickAdd} />
    </ContentCell>
  );
};

export default SpecialistSpecialtiesList;
