import { useEffect } from "react";
import { useUI } from "~/hooks";
import { useLead } from "~/hooks/query";

import {
  PieChart,
  AreaChart,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  Area,
  Pie,
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
      fill="#666"
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
              <CardTitle>Recaudación total</CardTitle>
              <WalletIcon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-green-600">
              {formatToCurrency(
                parseInt(data?.totalCollected.monthly_collection)
              )}{" "}
              recaudado
            </h2>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
      <div className="flex justify-center gap-2 py-8">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="pl-8 text-xl font-semibold text-teal-blue-300">
              Cantidad de suscripciones por mes
            </h1>
            <BarChart
              width={800}
              height={400}
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
          </div>
          <div>
            <h1 className="pl-8 text-xl font-semibold text-teal-blue-300">
              Recaudación por mes
            </h1>
            <AreaChart
              width={800}
              height={400}
              data={data?.monthlySubscriptions}
              margin={{
                top: 10,
                right: 30,
                left: 30,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthYear" />
              <YAxis
                domain={["auto", "auto"]}
                tickCount={10}
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
                stroke="#8884d8"
                fill="#8884d8"
                label={<CurrencyLabel />}
              />
            </AreaChart>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="pl-8 text-xl font-semibold text-teal-blue-300">
              Suscripciones por canal de venta
            </h1>
            <PieChart
              width={800}
              height={400}
              margin={{
                top: 20,
                right: 30,
                left: 30,
                bottom: 50,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip content={<CustomTooltip name="Suscripciones" />} />
              <Pie
                data={data?.channelCollected}
                dataKey="subscriptions"
                cx="50%"
                cy="50%"
                outerRadius={130}
                fill="#8884d8"
                label={(entry) => entry.channel_name}
              >
                {data?.channelCollected?.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div>
            <h1 className="pl-8 text-xl font-semibold text-teal-blue-300">
              Recaudación por canal de venta
            </h1>
            <PieChart
              width={800}
              height={400}
              key={"channel_name"}
              margin={{
                top: 10,
                right: 30,
                left: 30,
                bottom: 50,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip
                content={<CustomTooltip name={"Recaudación"} currency />}
              />
              <Pie
                data={data?.channelCollected}
                dataKey="monthly_collection"
                cx="50%"
                cy="50%"
                outerRadius={130}
                fill="#8884d8"
                label={(entry) => entry.channel_name}
              >
                {data?.channelCollected?.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
