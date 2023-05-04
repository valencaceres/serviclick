import { useUI } from "~/store/hooks";
import { api } from "~/utils/api";

export function Billing() {
  const { broker } = useUI();

  const { data } = api.broker.getReport.useQuery({
    agentId: broker?.id || "",
  });

  console.log(data)

  return (
    <div className="flex w-full flex-col items-center gap-2 pl-12">
      <p>Test</p>
    </div>
  );
}
