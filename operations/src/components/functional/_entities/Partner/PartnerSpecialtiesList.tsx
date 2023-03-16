import { useState, useEffect } from "react";
import { ContentCell, ContentRow } from "../../../layout/Content";

import Button from "../../../ui/Button";
import ComboBox from "../../../ui/ComboBox";

import { useSpecialty, useFamily } from "../../../../hooks";
import { usePartner } from "../../../../store/hooks";

const PartnerSpecialtiesList = ({ setShow }: any) => {
  const { list } = useFamily();
  const { getSpecialtiesByFamilyId, specialtyList } = useSpecialty();
  const { partner, setPartner } = usePartner();

  const initialData = {
    family_id: "",
    family_name: "",
    specialty_id: "",
    specialty_name: "",
  };

  const [specialityItem, setSpecialityItem] = useState(initialData);

  const handleChangeFamily = (e: any) => {
    getSpecialtiesByFamilyId(e.target.value);
    setSpecialityItem({
      family_id: e.target.value,
      family_name: e.target.options[e.target.selectedIndex].text,
      specialty_id: "",
      specialty_name: "",
    });
  };

  const handleChangeSpeciality = (e: any) => {
    setSpecialityItem({
      ...specialityItem,
      specialty_id: e.target.value,
      specialty_name: e.target.options[e.target.selectedIndex].text,
    });
  };

  const handleClickAdd = () => {
    setPartner({
      ...partner,
      specialties: [
        ...partner.specialties,
        {
          id: specialityItem.specialty_id,
          family_id: specialityItem.family_id,
          family_name: specialityItem.family_name,
          name: specialityItem.specialty_name,
        },
      ],
    });
    setSpecialityItem(initialData);
    setShow(false);
  };

  return (
    <ContentCell gap="20px">
      <ContentCell gap="5px">
        <ComboBox
          id="cmbFamily"
          label="Familia"
          width="300px"
          value={specialityItem.family_id}
          onChange={handleChangeFamily}
          placeHolder=":: Seleccione familia ::"
          data={list || []}
          dataValue="id"
          dataText="name"
        />
        <ComboBox
          id="cmbSpeciality"
          label="Especialidad"
          width="300px"
          value={specialityItem.specialty_id}
          onChange={handleChangeSpeciality}
          placeHolder=":: Seleccione especialidad ::"
          data={specialtyList || []}
          dataValue="id"
          dataText="name"
        />
      </ContentCell>
      <Button text="Agregar" onClick={handleClickAdd} />
    </ContentCell>
  );
};

export default PartnerSpecialtiesList;
