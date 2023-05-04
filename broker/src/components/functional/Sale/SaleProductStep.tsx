import { Button } from "~/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { useUI } from "~/store/hooks";
import { RouterOutputs, api } from "~/utils/api";

export function SaleProductStep({ onDone }: { onDone: () => void }) {
  const { broker, family } = useUI();

  const { data: products, isLoading } = api.broker.getProducts.useQuery(
    {
      brokerId: broker?.id || "",
      familyId: family?.id || "",
    },
    {
      enabled: !!broker && !!family,
    }
  );

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

type Product = RouterOutputs["broker"]["getProducts"][number];

function ProductCard({
  id,
  name,
  currency,
  companyprice,
  customerprice,
}: Product) {
  function formatPrice(price: number) {
    return price.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });
  }

  console.log(currency);

  return (
    <Card className="w-full max-w-xs text-center">
      <CardHeader className="flex h-20 items-center justify-center rounded-t-md bg-primary">
        <CardTitle className="text-teal-blue">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between rounded-b-md bg-teal-blue p-2">
        <div className="w-full border-r p-2">
          <Button className="flex w-full flex-col items-center justify-center p-6">
            <h2>Persona</h2>
            <h3 className="text-lg font-semibold">
              {formatPrice(customerprice)}
            </h3>
          </Button>
        </div>
        <div className="w-full border-l p-2">
          <Button className="flex w-full flex-col items-center justify-center p-6">
            <h2>Empresa</h2>
            <h3 className="text-lg font-semibold">
              {formatPrice(companyprice)}
            </h3>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
