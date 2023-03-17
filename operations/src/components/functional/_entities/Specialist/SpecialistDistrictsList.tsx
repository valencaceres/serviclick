import { useState } from "react";
import { ContentCell } from "../../../layout/Content";

import Button from "../../../ui/Button";
import ComboBox from "../../../ui/ComboBox";

import { useDistrict } from "../../../../hooks";
import { useSpecialist } from "../../../../store/hooks";

const SpecialistSpecialtiesList = ({ setShow }: any) => {
  const { list: districtList } = useDistrict();
  const { specialist, setSpecialist } = useSpecialist();

  const initialData = {
    district_id: "",
    district_name: "",
  };

  const [districtItem, setDistrictItem] = useState(initialData);

  const handleChangeDistrict = (e: any) => {
    setDistrictItem({
      district_id: e.target.value,
      district_name: e.target.options[e.target.selectedIndex].text,
    });
  };

  const handleClickAdd = () => {
    setSpecialist({
      ...specialist,
      districts: [
        ...specialist.districts,
        {
          id: districtItem.district_id,
          region_number: 0,
          region_name: "",
          province_name: "",
          district_name: districtItem.district_name,
        },
      ],
    });
    setDistrictItem(initialData);
    setShow(false);
  };

  return (
    <ContentCell gap="20px">
      <ComboBox
        id="cmbDistrict"
        label="Comuna"
        width="300px"
        value={districtItem.district_id}
        onChange={handleChangeDistrict}
        placeHolder=":: Seleccione comuna ::"
        data={districtList}
        dataValue="id"
        dataText="district_name"
      />
      <Button text="Agregar" onClick={handleClickAdd} />
    </ContentCell>
  );
};

export default SpecialistSpecialtiesList;
