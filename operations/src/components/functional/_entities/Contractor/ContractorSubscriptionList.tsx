import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { CalendarIcon, PlusIcon } from "lucide-react";
import {
  ContentCell,
  ContentCellSummary,
  ContentRow,
} from "../../../layout/Content";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableCellEnd,
} from "../../../ui/Table";
import { Button } from "~/components/ui/ButtonC";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import ComboBox from "~/components/ui/ComboBox";

import { useQueryLead, useQueryProduct } from "~/hooks/query";
import { useQueryClient } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";
import { cn } from "~/utils/cn";
import { format } from "date-fns";
import { Calendar } from "~/components/ui/Calendar";

import { es } from "date-fns/locale";
import { useCustomer } from "~/store/hooks";

const ContractorSubscriptionList = ({ contractor, subscriptionClick }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { selectProduct, product } = useCustomer();

  const handleChangeProduct = (productId: string) => {
    const existingProduct = contractor?.origins?.find(
      (item: any) => item?.product?.id === productId
    );
    if (existingProduct) {
      selectProduct(existingProduct);
    }
  };
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  return (
    <ContentCell gap="5px">
      <Table width="485px" height="563px">
        <TableHeader>
          <TableCell width="60px">N°</TableCell>
          <TableCell width="360px">Producto</TableCell>
          <TableCell width="110px">Adquisición</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {contractor?.origins?.map((item: any, idx: number) => (
            <TableRow
              key={idx}
              link={true}
              onClick={() => handleChangeProduct(item?.product?.id)}
            >
              <TableCell width="60px">{item?.subscription_id}</TableCell>
              <TableCell width="360px">{item?.product?.name}</TableCell>
              <TableCell width="110px" align="center">
                {formatDate(item?.dates?.purchase)}
              </TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <ContentRow align="space-between">
        <ContentCellSummary
          color={contractor?.origins?.length > 0 ? "blue" : "#959595"}
        >
          {contractor?.origins?.length > 0
            ? contractor?.origins?.length === 1
              ? `${contractor?.origins?.length} suscripción`
              : `${contractor?.origins?.length} suscripciones`
            : `No hay suscripciones`}
        </ContentCellSummary>
        <AddSubscription
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          contractor={contractor}
        />
      </ContentRow>
    </ContentCell>
  );
};

export default ContractorSubscriptionList;

const AddSubscription = ({
  isOpen,
  setIsOpen,
  contractor,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  contractor: any;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());

  const { watch, setValue, handleSubmit, reset } = useForm<{
    subscription: string;
    plan: string;
    agent: string;
    date: Date | string;
  }>({
    mode: "onChange",
  });

  const subscription = watch("subscription");
  const plan = watch("plan");
  const agent = watch("agent");

  const { data } = useQueryProduct().useGetByRetailRut(
    contractor?.customer?.rut
  );
  const { mutate: addProduct } = useQueryLead().useAddProduct();

  const add = () => {
    addProduct(
      {
        productPlan_id: plan,
        agent_id: agent,
        product_id: subscription,
        company_id: router.query.id,
        customDate: date,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["contractor", router.query.id]);
          reset();
          setIsOpen(false);
        },
      }
    );
  };

  useEffect(() => {
    if (subscription) {
      setValue(
        "agent",
        data?.find((item: any) => item.product_id === subscription)?.agent_id
      );
      setValue(
        "plan",
        data.find((item: any) => item.product_id === subscription)
          ?.productplan_id
      );
      setPrice(
        data?.find((item: any) => item.product_id === subscription)?.price
      );
    }
  }, [data, plan, setValue, subscription]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="h-10 w-10 rounded-full p-2">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <form onSubmit={handleSubmit(add)}>
          <DialogHeader>
            <DialogTitle>Agregar Suscripción</DialogTitle>
            <DialogDescription>
              Selecciona una suscripción de la lista.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 py-2">
            <Popover modal>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  type="button"
                  className={cn(
                    "w-full justify-start rounded-sm border-dusty-gray border-opacity-40 py-6 text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP", {
                      locale: es,
                    })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  className="z-50"
                  selected={date}
                  onSelect={(day) => {
                    if (day) {
                      setDate(day);
                    }
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <ComboBox
              label="Suscripción"
              data={data}
              placeHolder="Selecciona una suscripción"
              dataText="name"
              dataValue="product_id"
              value={subscription}
              onChange={(e: any) => {
                setValue("subscription", e.target.value);
              }}
              width="100%"
            />
            {subscription && (
              <div>
                <h2 className="text-lg font-medium text-teal-blue">
                  Valor del plan
                </h2>
                <h3 className="px-2 text-xl font-semibold text-teal-blue">
                  {price.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </h3>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button>Agregar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
