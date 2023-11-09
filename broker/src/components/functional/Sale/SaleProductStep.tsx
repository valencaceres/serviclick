import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Button } from "~/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";

import { useUI } from "~/store/hooks";
import { IProduct } from "~/interfaces/product";
import { useBroker } from "~/store/hooks";
export function SaleProductStep({
  previousStep,
}: {
  onDone: () => void;
  previousStep: () => void;
}) {
  const { family } = useUI();
  const { isLoading } = useBroker();
  const products = family?.products;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        previousStep();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previousStep]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 pb-24 pl-12">
      <h2 className="text-2xl font-bold text-teal-blue">{family?.name}</h2>
      <div className="flex w-full max-w-5xl flex-col flex-wrap items-center justify-center gap-2 md:flex-row">
        {isLoading ? (
          <div className="w-full">
            <h2 className="text-center text-xl font-bold text-teal-blue">
              Cargando...
            </h2>
          </div>
        ) : !products?.length ? (
          <div className="w-full">
            <h2 className="text-center text-2xl font-bold text-teal-blue">
              No hay productos disponibles...
            </h2>
          </div>
        ) : (
          products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
      </div>
    </div>
  );
}

function ProductCard({
  id,
  name,
  currency,
  frequency,
  productPlan_id,
  price,
}: IProduct) {
  const router = useRouter();
  const { user } = useUser();

  function formatPrice(price: number) {
    return price.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });
  }
  const type = frequency === "M" ? "mensual" : frequency === "A" ? "anual" : "semanal";
  return (
    <Card className="w-full max-w-xs text-center">
      <CardHeader className="flex h-20 items-center justify-center  rounded-t-md bg-primary-500">
        <CardTitle className="text-teal-blue">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between rounded-b-md bg-teal-blue p-2">
        <div className="w-full p-2">
          <Button
            className="flex w-full flex-col items-center justify-center p-6"
            onClick={() =>
              void router.push(
                `https://productos.serviclick.cl/contractor?productPlanId=${productPlan_id}&userId=${user?.id}`
              )
            }
          >
            <h2 className="capitalize">{type}</h2>
            <h3 className="text-lg font-semibold">{formatPrice(price)}</h3>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
