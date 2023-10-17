import React, { useEffect, useState, useMemo } from "react";
import { useUI } from "~/hooks";
import { Progress } from "~/components/ui/Progress";
import { useSocketStore } from "~/store/zustand/uploadProgressStore";
import useQueryProduct from "~/hooks/query/useQueryProduct";
interface ProgressByProductPlan {
  [key: string]: number;
}
const DashboardPage = () => {
  const { setTitleUI } = useUI();

  useEffect(() => {
    setTitleUI("Subidas");
  }, []);

  const { summaryData, rowData } = useSocketStore();
  const { data: products } = useQueryProduct().useGetAll();
  const { data: retails } = useQueryProduct().useGetAllRetails();

  const [progressByProductPlan, setProgressByProductPlan] =
    useState<ProgressByProductPlan>({});
  const [errorRowIndices, setErrorRowIndices] = useState<number[]>([]);

  useEffect(() => {
    if (summaryData && rowData) {
      const filteredRows = rowData.filter(
        (data) =>
          data.retail_id === summaryData.retail_id &&
          data.productPlan_id === summaryData.productPlan_id
      );

      const newTotalProgress = (filteredRows.length / summaryData.total) * 100;

      const key = `${summaryData.productPlan_id}_${summaryData.retail_id}`;

      setProgressByProductPlan((prevProgress) => {
        return {
          ...prevProgress,
          [key]: newTotalProgress,
        };
      });

      const errorRowIndices = rowData
        .map((data, index) => (!data.status ? index + 1 : null))
        .filter((index) => index !== null) as number[];

      setErrorRowIndices(errorRowIndices);
    }
  }, [summaryData, rowData]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 pl-16">
      <div className="flex w-full flex-col justify-center gap-4 overflow-y-auto border">
        <div className="text-center text-2xl font-bold">
          <h1>Resumen de subidas</h1>
        </div>

        {Object.entries(progressByProductPlan).length === 0 ? (
          <h2 className="text-center text-2xl font-bold">
            Sin cargas por el momento
          </h2>
        ) : (
          [...Object.entries(progressByProductPlan)]
            .reverse()
            .map(([key, progress]) => {
              const [productPlanId, retailId] = key.split("_");

              const retailName =
                (retails as any[]).find((r) => r.id === retailId)?.name ||
                "Retail Desconocido";
              const filteredRows = rowData?.filter(
                (data) =>
                  data.retail_id === retailId &&
                  data.productPlan_id === productPlanId
              );

              return (
                <div key={key}>
                  <p>{`Retail: ${retailName}, `}</p>
                  <Progress value={progress} />
                  <div className="mt-4 text-center">
                    <p>{`Cargando ${filteredRows?.length} de ${summaryData?.total} filas`}</p>
                    {errorRowIndices.length > 0 && (
                      <p>{`Error en las filas ${errorRowIndices.join(
                        ", "
                      )}`}</p>
                    )}
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
