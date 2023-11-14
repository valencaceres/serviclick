import { useUI } from "~/store/hooks";
import { DataTable } from "../Payment/DataTable";
import { useRouter } from "next/router";
import { columns } from "../Payment/columns";
import { usePayment } from "~/store/hooks";
import { FloatMenu, ButtonIcon } from "~/components/ui";

import { useEffect } from "react";
export function Payment() {
  const router = useRouter();
  const { retail } = useUI();
  const { paymentList, getByRetailId, codeValue, upsert, isLoading } =
    usePayment();

  useEffect(() => {
    if (retail?.id) {
      getByRetailId(retail.id);
    }
  }, [retail?.id, getByRetailId]);

  const handleRefresh = () => {
    if (retail) {
      getByRetailId(retail?.id);
    }
  };

  const handleClickHome = () => {
    router.push("/");
  };
  const handleClickSave = () => {
    upsert(codeValue);
  };

  if (retail?.id === "") {
    return (
      <div className="w-full">
        <h2 className="text-center text-xl font-bold text-teal-blue">
          Seleccione un retail...
        </h2>
      </div>
    );
  }
  if (paymentList[0].lead_id === "")
    return (
      <div className="w-full">
        <h2 className="text-center text-xl font-bold text-teal-blue">
          Sin datos disponibles...
        </h2>
      </div>
    );
  return (
    <div className="flex w-full flex-col items-center gap-2 pl-12">
      <DataTable columns={columns} data={paymentList} />
      <FloatMenu>
        <ButtonIcon onClick={handleClickHome} iconName="home" />
        <ButtonIcon onClick={handleRefresh} iconName="refresh" />
        <ButtonIcon
          onClick={handleClickSave}
          iconName="save"
          disabled={isLoading}
        />
      </FloatMenu>
    </div>
  );
}
