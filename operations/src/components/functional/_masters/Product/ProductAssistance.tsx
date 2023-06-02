import { useState } from "react";

import { Button } from "~/components/ui/ButtonC";
import { FormLabel } from "~/components/ui/Form";
import { Input } from "~/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";

import { useQueryAssistances } from "~/hooks/query";

const dataCurrency = [
  { code: "P", name: "Pesos" },
  { code: "U", name: "U.F." },
];

const ProductAssistance = ({
  form,
  assistancesList,
  setAssistances,
  setIsOpen,
}: any) => {
  const [serviceName, setServiceName] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [currency, setCurrency] = useState("P");
  const [maximum, setMaximum] = useState("");
  const [events, setEvents] = useState("");
  const [lack, setLack] = useState("");

  const { data: assistances } = useQueryAssistances().useGetAll();

  return (
    <div className="flex w-full flex-col gap-2">
      <div>
        <FormLabel>Servicio</FormLabel>
        <Select
          onValueChange={(value) => setServiceName(value)}
          defaultValue={serviceName}
          required
        >
          <SelectTrigger className="py-6">
            <SelectValue placeholder="Seleccione servicio" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {assistances?.map((item: any) => (
              <SelectItem
                className="hover:bg-gray-50"
                key={item.id}
                value={item.name}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <div className="w-full">
          <FormLabel>Monto</FormLabel>
          <Input
            type="number"
            className="w-full"
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <FormLabel>Moneda</FormLabel>
          <Select
            onValueChange={(value) => setCurrency(value)}
            defaultValue={currency}
          >
            <SelectTrigger className="w-full py-6">
              <SelectValue placeholder="Selecccione moneda" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {dataCurrency?.map((item: any) => (
                <SelectItem
                  className="hover:bg-gray-50"
                  key={item.code}
                  value={item.code}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-full">
          <FormLabel>Límite</FormLabel>
          <Input
            className="w-full"
            onChange={(e) => setMaximum(e.target.value)}
          />
        </div>
        <div className="w-full">
          <FormLabel>Eventos anuales</FormLabel>
          <Input
            type="number"
            className="w-full"
            onChange={(e) => setEvents(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <FormLabel>Período de carencia</FormLabel>
          <Input
            type="number"
            className="w-full"
            onChange={(e) => setLack(e.target.value)}
            required
          />
        </div>
      </div>
      <Button
        type="button"
        className="mt-4"
        disabled={!serviceName || !amount || !events || !lack}
        onClick={() => {
          const assistanceId = assistances.find(
            (item: any) => item.name === serviceName
          )?.id;

          setAssistances([
            ...assistancesList,
            {
              id: assistanceId,
              name: serviceName,
              amount,
              currency,
              maximum,
              events,
              lack,
            },
          ]);
          setIsOpen(false);
        }}
      >
        Registrar
      </Button>
    </div>
  );
};

export default ProductAssistance;
