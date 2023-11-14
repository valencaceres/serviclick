import { useEffect } from "react";
import { useUI } from "~/store/hooks";
import { Button } from "~/components/ui/Button";
import { type IFamily } from "../../../interfaces/family";
import { useRetail } from "~/store/hooks";
export function SaleFamilyStep({ onDone }: { onDone: () => void }) {
  const { retail, setFamily } = useUI();
  const { familiesList: data, getFamiliesByRetailId, isLoading } = useRetail();
  useEffect(() => {
    if (retail) {
      getFamiliesByRetailId(retail.id);
    }
  }, [retail, getFamiliesByRetailId]);

  const selectFamily = (family: IFamily) => {
    setFamily({
      id: family.id,
      icon: family.icon,
      name: family.name,
      products: family.products,
    });
    onDone();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 pb-24 pl-12">
      <h2 className="text-2xl font-bold text-teal-blue">Familias</h2>
      <div className="flex w-full max-w-5xl flex-col flex-wrap items-center justify-center gap-2 md:flex-row">
        {retail?.id === "" ? (
          <div className="w-full">
            <h2 className="text-center text-xl font-bold text-teal-blue">
              Seleccione un retail para mostrar las familias disponibles...
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
interface Family {
  id: string;
  name: string;
  icon: string;
}

function FamilyCard({
  id,
  name,
  icon,
  products,
  onClick,
}: IFamily & { onClick: (family: IFamily) => void }) {
  return (
    <Button
      key={id}
      onClick={() => onClick({ id, name, icon, products })}
      className="hover:bg-primary-600 active:bg-primary-700 w-full max-w-xs cursor-pointer select-none bg-primary-500 p-10 text-center text-2xl text-teal-blue shadow-md duration-75 hover:shadow-none"
    >
      {name}
    </Button>
  );
}
