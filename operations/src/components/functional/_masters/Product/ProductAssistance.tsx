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
  assistance,
  setIsOpen,
}: any) => {
  const [serviceName, setServiceName] = useState<string | undefined>(
    assistance ? assistance.name : undefined
  );
  const [amount, setAmount] = useState(assistance ? assistance.amount : "");
  const [currency, setCurrency] = useState(
    assistance ? assistance.currency : "P"
  );
  const [maximum, setMaximum] = useState(assistance ? assistance.maximum : "");
  const [events, setEvents] = useState(assistance ? assistance.events : 0);
  const [lack, setLack] = useState(assistance ? assistance.lack : 0);

  const { data: assistances } = useQueryAssistances().useGetAll();

  const addOrUpdateAssistance = () => {
    const assistanceId = assistances.find(
      (item: any) => item.name === serviceName
    )?.id;

    const newAssistance = {
      id: assistanceId,
      name: serviceName,
      amount,
      currency,
      maximum,
      events,
      lack,
    };

    const assistanceIndex = assistancesList.findIndex(
      (item: any) => item.id === newAssistance.id
    );

    if (assistanceIndex > -1) {
      // The assistance already exists, so we update it.
      setAssistances(
        assistancesList.map((item: any, index: number) =>
          index === assistanceIndex ? newAssistance : item
        )
      );
    } else {
      // The assistance doesn't exist, so we add it to the list.
      setAssistances([...assistancesList, newAssistance]);
    }

    setIsOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div>
        <FormLabel>Servicio</FormLabel>
        <Select
          onValueChange={(value) => setServiceName(value)}
          defaultValue={serviceName}
          required
        >
          <SelectTrigger className="rounded-sm border-dusty-gray-500 border-opacity-40 py-6 hover:border-opacity-90">
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
            value={amount}
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
            <SelectTrigger className="w-full rounded-sm border-dusty-gray-500 border-opacity-40 py-6 py-6 hover:border-opacity-90">
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
            value={maximum}
            onChange={(e) => setMaximum(e.target.value)}
          />
        </div>
        <div className="w-full">
          <FormLabel>Eventos anuales</FormLabel>
          <Input
            type="number"
            className="w-full"
            value={events}
            onChange={(e) => setEvents(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="w-full">
          <FormLabel>Período de carencia</FormLabel>
          <Input
            type="number"
            className="w-full"
            value={lack}
            onChange={(e) => setLack(parseInt(e.target.value))}
            required
          />
        </div>
      </div>
      <Button
        type="button"
        className="mt-4"
        disabled={!serviceName || !amount}
        onClick={addOrUpdateAssistance}
      >
        Registrar
      </Button>
    </div>
  );
};

export default ProductAssistance;
