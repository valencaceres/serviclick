import { useEffect } from "react";
import { useUI } from "~/hooks";
import { useLead } from "~/hooks/query";

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

const formatToCurrency = (value: number) => {
  return value.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];

const CurrencyLabel = ({ x, y, value }: any) => {
  return (
    <text
      x={x + 5}
      y={y}
      dy={-4}
      fill="teal"
      fontSize={10}
      textAnchor="middle"
      className="text-teal-blue"
    >
      {formatToCurrency(parseInt(value))}
    </text>
  );
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

export function Dashboard() {
  const { setTitleUI } = useUI();

  useEffect(() => {
    setTitleUI("Dashboard");
  }, []);

  const { data } = useLead().useGetStatistics();

  if (!data) return null;

  console.log(data);

  return (
    <div className="flex w-full flex-col items-center justify-center pl-16">
      <div className="flex w-full justify-center gap-4">
        <Card className="w-full max-w-sm hover:bg-slate-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Suscripciones totales</CardTitle>
              <WalletIcon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold">
              {data?.totalCollected.subscriptions} suscripciones
            </h2>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card className="w-full max-w-sm hover:bg-slate-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recaudación mensual</CardTitle>
              <WalletIcon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-green-600">
              {formatToCurrency(
                parseInt(data?.totalCollected.monthly_collection)
              )}{" "}
              recaudación
            </h2>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
      <div className="flex w-full max-w-[1800px] justify-center gap-2 py-8">
        <div className="flex w-1/2 flex-col gap-2">
          <Card className="py-4">
            <h1 className="pl-8 text-xl font-semibold text-teal-blue-300">
              Cantidad de suscripciones por mes
            </h1>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data?.monthlySubscriptions}
                margin={{ top: 20, right: 30, left: 30, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip name="Suscripciones" />} />
                <Legend />
                <Bar
                  dataKey={"subscriptions"}
                  name="Cantidad Suscripciones"
                  fill="#8884d8"
                  label={{ position: "top", fill: "teal" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="w-full py-4">
            <h1 className="pl-8 text-xl font-semibold text-teal-blue-300">
              Recaudación por mes
            </h1>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={data?.monthlySubscriptions}
                margin={{
                  top: 10,
                  right: 50,
                  left: 50,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis
                  domain={["auto", "auto"]}
                  type="number"
                  tickFormatter={formatToCurrency}
                />
                <Tooltip
                  content={<CustomTooltip name={"Recaudación"} currency />}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="collection"
                  name="Recaudación"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  label={<CurrencyLabel />}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
        <div className="flex w-1/2 flex-col gap-2">
          <Card className="w-full py-4">
            <h1 className="pl-8 text-xl font-semibold text-teal-blue-300">
              Suscripciones por canal de venta
            </h1>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data?.channelCollected}
                margin={{ top: 20, right: 30, left: 50, bottom: 0 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="channel_name" type="category" />
                <Tooltip content={<CustomTooltip name="Suscripciones" />} />
                <Bar
                  dataKey={"subscriptions"}
                  name="Cantidad Suscripciones"
                  fill="#8884d8"
                  label={{ position: "right", fill: "teal" }}
                >
                  {data?.channelCollected?.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="w-full py-4">
            <h1 className="pl-8 text-xl font-semibold text-teal-blue-300">
              Recaudación por canal de venta
            </h1>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data?.channelCollected}
                margin={{ top: 20, right: 30, left: 50, bottom: 0 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={formatToCurrency} />
                <YAxis dataKey="channel_name" type="category" />
                <Tooltip
                  content={<CustomTooltip name={"Recaudación"} currency />}
                />
                <Bar
                  dataKey={"monthly_collection"}
                  name="Recaudación por"
                  fill="#8884d8"
                  label={{
                    position: "right",
                    fill: "teal",
                    formatter: formatToCurrency,
                  }}
                >
                  {data?.channelCollected?.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}
