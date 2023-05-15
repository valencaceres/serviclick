import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "~/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { useUI } from "~/store/hooks";
import { type RouterOutputs, api } from "~/utils/api";

export function SaleProductStep({
  onDone,
  previousStep,
}: {
  onDone: () => void;
  previousStep: () => void;
}) {
  const { broker, family } = useUI();

  const { data: products, isLoading } = api.product.getProducts.useQuery(
    {
      brokerId: broker?.id || "",
      familyId: family?.id || "",
    },
    {
      enabled: !!broker && !!family,
    }
  );

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
            <ProductCard
              key={product.id}
              {...product}
              broker={broker?.id || ""}
            />
          ))
        )}
      </div>
    </div>
  );
}

type Product = RouterOutputs["product"]["getProducts"][number];

function ProductCard({
  id,
  name,
  companyprice,
  customerprice,
  broker,
}: Product & { broker: string }) {
  const { data } = api.product.getProductPlan.useQuery({
    agentId: broker,
    productId: id,
  });

  function formatPrice(price: number) {
    return price.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });
  }

  const customerId = data?.find((plan) => plan.type === "customer")?.id;
  const companyId = data?.find((plan) => plan.type === "company")?.id;

  return (
    <Card className="w-full max-w-xs text-center">
      <CardHeader className="flex h-20 items-center justify-center rounded-t-md bg-primary">
        <CardTitle className="text-teal-blue">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between rounded-b-md bg-teal-blue p-2">
        <div className="w-full border-r p-2">
          <Link
            href={`https://productos.serviclick.cl/contractor?productPlanId=${customerId}`}
            passHref
          >
            <Button className="flex w-full flex-col items-center justify-center p-6">
              <h2>Persona</h2>
              <h3 className="text-lg font-semibold">
                {formatPrice(customerprice)}
              </h3>
            </Button>
          </Link>
        </div>
        <div className="w-full border-l p-2">
        <Link
            href={`https://productos.serviclick.cl/contractor?productPlanId=${companyId}`}
            passHref
          >
          <Button className="flex w-full flex-col items-center justify-center p-6">
            <h2>Empresa</h2>
            <h3 className="text-lg font-semibold">
              {formatPrice(companyprice)}
            </h3>
          </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
