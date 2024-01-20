import { useEffect } from "react";
import { useUI } from "~/hooks";
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  Area,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { WalletIcon } from "lucide-react";
import { useQueryCase } from "../../../hooks/query";
const formatToCurrency = (value: number) => {
  return value.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
};

const CustomTooltip = ({ active, payload, label, name, currency }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border bg-white p-4 shadow-md">
        <h1 className="font-semibold text-teal-blue">{label}</h1>
        <p className="label">{`${name} : ${
          currency
            ? formatToCurrency(parseInt(payload[0].value))
            : payload[0].value
        }`}</p>
      </div>
    );
  }

  return null;
};

const DashboardPage = () => {
  const { setTitleUI } = useUI();

  useEffect(() => {
    setTitleUI("Dashboard");
  }, []);
  const { data } = useQueryCase().useGetStatistics();
  let totalReimbursmentAmount = data?.casesReimbursment?.reduce(
    (total: any, item: any) => {
      return total + item.totalReimbursmentsAmount;
    },
    0
  );

  if (!data) return null;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 pl-16">
      <div className="flex w-full justify-center gap-4">
        <Card className="w-full max-w-sm hover:bg-slate-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Casos totales</CardTitle>
              <WalletIcon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            {data && data.totalCases && data.totalCases[0] && (
              <h2 className="text-2xl font-bold">
                {data.totalCases[0].totalCases} Casos
              </h2>
            )}
          </CardContent>
        </Card>
        <Card className="w-full max-w-sm hover:bg-slate-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Casos activos</CardTitle>
              <WalletIcon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold">
              {data?.totalCases &&
              data.totalCases[0]?.totalActiveCases !== undefined
                ? data.totalCases[0].totalActiveCases
                : "Sin datos disponibles"}{" "}
              Casos activos
            </h2>
          </CardContent>
        </Card>
        <Card className="w-full max-w-sm hover:bg-slate-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Casos cerrados</CardTitle>
              <WalletIcon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold">
              {data?.totalCases &&
              data.totalCases[0]?.totalInactiveCases !== undefined
                ? data.totalCases[0].totalInactiveCases
                : "Sin datos disponibles"}{" "}
              Casos cerrados
            </h2>
          </CardContent>
        </Card>
        <Card className="w-full max-w-sm hover:bg-slate-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Reembolsos totales</CardTitle>
              <WalletIcon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-red-600">
              {formatToCurrency(parseInt(totalReimbursmentAmount))} Reembolsos
            </h2>
          </CardContent>
        </Card>
      </div>
      <div className="flex w-full max-w-[1800px] justify-center gap-2">
        <div className="flex w-1/2 flex-col gap-2">
          <Card className="py-4">
            <h1 className="pl-8 text-xl font-semibold text-teal-blue-300">
              Cantidad de casos por mes
            </h1>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={data?.monthlyCases}
                margin={{ top: 20, right: 30, left: 30, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip name="Casos" />} />
                <Legend />
                <Bar
                  dataKey={"cases"}
                  name="Cantidad Casos"
                  fill="#8884d8"
                  label={{ position: "top", fill: "teal" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="py-4">
            <h1 className="pl-8 text-xl font-semibold text-teal-blue-300">
              Casos activos por mes
            </h1>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={data?.monthlyCases}
                margin={{ top: 20, right: 30, left: 30, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip name="Casos activos" />} />
                <Legend />
                <Bar
                  dataKey={"activeCases"}
                  name="casos activos"
                  fill="#8884d8"
                  label={{ position: "top", fill: "teal" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
        <div className="flex w-1/2 flex-col gap-2">
          <Card className="py-4">
            <h1 className="pl-8 text-xl font-semibold text-teal-blue-300">
              Cantidad reembolsada por mes
            </h1>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={data?.casesReimbursment}
                margin={{ top: 20, right: 30, left: 30, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip name="Reembolsos" />} />
                <Legend />
                <Bar
                  dataKey={"totalReimbursmentsAmount"}
                  name="Cantidad reembolsada por mes"
                  fill="#CD5C5C"
                  label={{
                    position: "right",
                    fill: "red",
                    formatter: formatToCurrency,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="py-4">
            <h1 className="pl-8 text-xl font-semibold text-teal-blue-300">
              Casos cerrados por mes
            </h1>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={data?.monthlyCases}
                margin={{ top: 20, right: 30, left: 30, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip name="Casos cerrados" />} />
                <Legend />
                <Bar
                  dataKey={"inactiveCases"}
                  name="casos cerrados"
                  fill="#8884d8"
                  label={{ position: "top", fill: "teal" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
