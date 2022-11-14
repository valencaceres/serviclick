import { useEffect } from "react";
import { useRouter } from "next/router";

import { ContentCenter } from "../../../layout/Content";

import { MenuButtons, MenuItem } from "../../../ui/MenuButtons";
import Icon from "../../../ui/Icon";

import { useUI, useRetail } from "../../../../hooks";

const Family = () => {
  const router = useRouter();

  const { retail, setFamilyUI, family } = useUI();
  const { familyList, getProductsByRetailIdAndFamilyId } = useRetail();

  const handleClickFamily = (familyItem: any) => {
    getProductsByRetailIdAndFamilyId(retail.id, familyItem.id);
    setFamilyUI(familyItem);
    router.push(`/menu/product`);
  };

  return (
    <ContentCenter>
      <MenuButtons>
        {familyList.map((item: any, idx: number) => (
          <MenuItem key={idx} onClick={() => handleClickFamily(item)}>
            <Icon iconName={item.icon} />
            {item.name}
          </MenuItem>
        ))}
      </MenuButtons>
    </ContentCenter>
  );
};

export default Family;
