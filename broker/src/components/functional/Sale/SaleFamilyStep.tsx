import { type RouterOutputs, api } from "~/utils/api";

import { useUI } from "~/store/hooks";
import { Button } from "~/components/ui/Button";

export function SaleFamilyStep({ onDone }: { onDone: () => void }) {
  const { broker, setFamily } = useUI();

  const { data, isLoading } = api.broker.getFamilies.useQuery(
    {
      brokerId: broker?.id || "",
    },
    {
      enabled: !!broker,
    }
  );

  const selectFamily = (family: Family) => {
    setFamily(family);
    onDone();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 pb-24 pl-12">
      <h2 className="text-2xl font-bold text-teal-blue">Familias</h2>
      <div className="flex w-full max-w-5xl flex-col flex-wrap items-center justify-center gap-2 md:flex-row">
        {!broker ? (
          <div className="w-full">
            <h2 className="text-center text-xl font-bold text-teal-blue">
              Seleccione un broker para mostrar las familias disponibles...
            </h2>
          </div>
        ) : isLoading ? (
          <div className="w-full">
            <h2 className="text-center text-xl font-bold text-teal-blue">
              Cargando...
            </h2>
          </div>
        ) : (
          data?.map((family) => (
            <FamilyCard key={family.id} {...family} onClick={selectFamily} />
          ))
        )}
      </div>
    </div>
  );
}

type Family = RouterOutputs["broker"]["getFamilies"][number];

function FamilyCard({
  id,
  name,
  icon,
  onClick,
}: Family & { onClick: (family: Family) => void }) {
  return (
    <Button
      key={id}
      onClick={() => onClick({ id, name, icon })}
      className="w-full max-w-xs p-10 select-none text-center text-2xl text-teal-blue cursor-pointer bg-primary-500 shadow-md duration-75 hover:bg-primary-600 hover:shadow-none active:bg-primary-700"
    >
          {name}
    </Button>
  );
}
