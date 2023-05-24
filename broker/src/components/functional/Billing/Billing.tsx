import { useUI } from "~/store/hooks";
import { DataTable } from "./DataTable";

import { columns } from "./columns";
import { api } from "~/utils/api";

export function Billing() {
  const { broker } = useUI();

  const { data } = api.broker.getReport.useQuery(
    {
      agentId: broker?.id || "",
    },
    {
      enabled: !!broker,
    }
  );

  if (!data) return null;

  return (
    <div className="flex w-full flex-col items-center gap-2 pl-12">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
