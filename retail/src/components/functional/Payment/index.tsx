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
  const {
    paymentList,
    getByRetailId,
    codeValue,
    upsert,
    isLoading,
    exportPayments,
  } = usePayment();
  console.log(paymentList, "payment");
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

  const handleExport = async () => {
    if (retail) {
      exportPayments(retail?.id);
    }
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
        <ButtonIcon
          iconName="cloud_upload"
          loading={isLoading}
          onClick={handleExport}
        />
        <ButtonIcon
          disabled={retail?.id === ""}
          onClick={handleRefresh}
          iconName="refresh"
        />
      </FloatMenu>
    </div>
  );
}
