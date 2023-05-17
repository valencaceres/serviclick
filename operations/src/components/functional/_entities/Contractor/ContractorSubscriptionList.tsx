import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { PlusIcon } from "lucide-react";
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
import { dbDateToText } from "../../../../utils/date";
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
import { useContractor } from "~/hooks";

const ContractorSubscriptionList = ({ contractor, subscriptionClick }: any) => {
  const { getSubscriptionById } = useContractor();

  useEffect(() => {
    if (contractor) {
      if (contractor?.subscriptions?.length > 0) {
        getSubscriptionById(contractor?.subscriptions[0]?.subscription_id);
      }
    }
  }, [contractor]);

  return (
    <ContentCell gap="5px">
      <Table width="485px" height="563px">
        <TableHeader>
          <TableCell width="360px">Producto</TableCell>
          <TableCell width="110px">Adquisición</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {contractor?.subscriptions?.map((item: any, idx: number) => (
            <TableRow
              key={idx}
              link={true}
              onClick={() => subscriptionClick(item)}
            >
              <TableCell width="360px">{item.product_name}</TableCell>
              <TableCell width="110px" align="center">
                {dbDateToText(item.createDate)}
              </TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <ContentRow align="space-between">
        <ContentCellSummary
          color={contractor?.subscriptions?.length > 0 ? "blue" : "#959595"}
        >
          {contractor?.subscriptions?.length > 0
            ? contractor?.subscriptions?.length === 1
              ? `${contractor?.subscriptions?.length} suscripción`
              : `${contractor?.subscriptions?.length} suscripciones`
            : `No hay suscripciones`}
        </ContentCellSummary>
        <AddSubscription />
      </ContentRow>
    </ContentCell>
  );
};

export default ContractorSubscriptionList;

const AddSubscription = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { watch, setValue, handleSubmit, reset } = useForm<{
    subscription: string;
    plan: string;
    agent: string;
  }>({
    mode: "onChange",
  });

  const subscription = watch("subscription");
  const plan = watch("plan");
  const agent = watch("agent");

  const { data } = useQueryProduct().useGetAll();
  const { mutate: addProduct } = useQueryLead().useAddProduct();

  console.log(agent)

  const add = () => {
    addProduct(
      {
        productPlan_id: plan,
        agent_id: agent,
        product_id: subscription,
        company_id: router.query.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["contractor", router.query.id]);
          reset();
        },
      }
    );
  };

  useEffect(() => {
    setValue(
      "agent",
      data
        ?.find((item: any) => item.id === subscription)
        ?.product_plans?.find((item: any) => item.id === plan)?.agent_id
    );
  }, [plan]);

  return (
    <Dialog>
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
            <ComboBox
              label="Suscripción"
              data={data}
              placeHolder="Selecciona una suscripción"
              dataText="name"
              dataValue="id"
              value={subscription}
              onChange={(e: any) => {
                setValue("subscription", e.target.value);
              }}
              width="100%"
            />
            {subscription && (
              <ComboBox
                label="Plan"
                data={data
                  .find((item: any) => item.id === subscription)
                  .product_plans.filter((item: any) => item.type === "company")}
                placeHolder="Selecciona un plan"
                dataText="price"
                dataValue="id"
                value={plan}
                onChange={(e: any) => {
                  setValue("plan", e.target.value);
                }}
                width="100%"
                currency={
                  data.find((item: any) => item.name === subscription)?.currency
                }
              />
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
