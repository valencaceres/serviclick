import { useEffect } from "react";
import { useUI } from "~/hooks";
import { useLead } from "~/hooks/query";

export function Dashboard() {
  const { setTitleUI } = useUI();

  useEffect(() => {
    setTitleUI("Dashboard")
  }, [])

  const { data } = useLead().useGetStatistics();

  console.log(data)

  return (
    <>
      Hello
    </>
  );
}
