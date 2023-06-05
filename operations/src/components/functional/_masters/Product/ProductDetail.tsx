import { useState, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableCellEnd,
} from "../../../ui/Table";

import { frequencyList, termList } from "../../../../data/masters";
import ProductAssistance from "./ProductAssistance";
import { useQueryFamily, useQueryProduct } from "~/hooks/query";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/Form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";
import { Button } from "~/components/ui/ButtonC";
import { cn } from "~/utils/cn";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/Command";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import { Checkbox } from "~/components/ui/Checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";
import FloatMenu from "~/components/ui/FloatMenu";
import ButtonIcon from "~/components/ui/ButtonIcon";
import { useRouter } from "next/router";
import Icon from "~/components/ui/Icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingMessage } from "~/components/ui/ModalMessage";
import { useToast } from "~/components/ui/use-toast";

export type CoverageT = {
  id: string;
  name: string;
  amount: string;
  maximum: string;
  lack: string;
  events: string;
  isCombined: boolean;
};

const assistanceSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.string(),
  maximum: z.string(),
  events: z.number(),
  lack: z.number(),
  currency: z.string(),
});

const formSchema = z.object({
  id: z.string().optional(),
  family_id: z.string(),
  name: z.string(),
  cost: z.string().refine((val) => parseInt(val) >= 0),
  isSubject: z.boolean(),
  frequency: z.enum(["M", "A", "S"]),
  term: z.string(),
  beneficiaries: z.string().refine((val) => parseInt(val) >= 0),
  currency: z.string(),
  dueDay: z.string().refine((val) => parseInt(val) >= 0),
  alias: z.string(),
  minInsuredCompanyPrice: z.string().refine((val) => parseInt(val) >= 0),
  title: z.string(),
  subTitle: z.string().optional(),
  description: z.string(),
  territorialScope: z.string(),
  hiringConditions: z.string(),
  assistances: z.array(assistanceSchema),
});

const ProductDetail = ({ product }: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [assistances, setAssistances] = useState<(typeof assistanceSchema)[]>(
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product?.id || undefined,
      family_id: product?.family_id || undefined,
      name: product?.name || "",
      cost: product?.cost || 0,
      isSubject: product?.isSubject || false,
      frequency: product?.frequency || "M",
      term: product?.term || "",
      beneficiaries: product?.beneficiaries || 0,
      currency: product?.currency || "P",
      dueDay: product?.dueDay || 0,
      alias: product?.alias || "",
      minInsuredCompanyPrice: product?.minInsuredCompanyPrice || 0,
      title: product?.title || "",
      subTitle: product?.subTitle || "",
      description: product?.description || "",
      territorialScope: product?.territorialScope || "",
      hiringConditions: product?.hiringConditions || "",
      assistances: product?.assistances || [],
    },
  });

  console.log(form.getValues())

  const { data: families } = useQueryFamily().useGetAll();

  const formatAmount = (amount: string, currency: string) => {
    if (amount === "0") {
      return "";
    }
    if (currency === "P") {
      return `$${parseInt(amount).toLocaleString("en-US").replace(",", ".")}`;
    } else {
      return `${amount} UF`;
    }
  };

  const { mutate: createProduct, isLoading } = useQueryProduct().useCreate();

  function onSubmit(values: z.infer<typeof formSchema>) {
    createProduct(
      {
        id: values.id || undefined,
        family_id: values.family_id,
        name: values.name,
        cost: parseInt(values.cost),
        isSubject: values.isSubject,
        frequency: values.frequency,
        term: values.term,
        beneficiaries: parseInt(values.beneficiaries),
        currency: values.currency,
        dueDay: parseInt(values.dueDay),
        alias: values.alias,
        minInsuredCompanyPrice: parseInt(values.minInsuredCompanyPrice),
        title: values.title,
        subTitle: values.subTitle,
        description: values.description,
        territorialScope: values.territorialScope,
        hiringConditions: values.hiringConditions,
        assistances: assistances,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["product", data.id]);
          if (router.pathname.includes("new")) {
            router.push(`${data.id}`);
          }
          toast({
            title: router.pathname.includes("new")
              ? "Producto creado"
              : "Producto actualizado",
            description: router.pathname.includes("new")
              ? "El producto se ha creado correctamente"
              : "El producto se ha actualizado correctamente",
          });
        },
      }
    );
  }

  useEffect(() => {
    if (product?.assistances) {
      setAssistances(product?.assistances);
    }
  }, [product]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ContentCell gap="20px">
            <ContentCell gap="5px">
              <ContentRow gap="5px">
                <FormField
                  control={form.control}
                  name="family_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Familia</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[314px] justify-between rounded-sm border-dusty-gray border-opacity-40 py-6",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? families?.find(
                                    (family: any) => family.id === field.value
                                  )?.name
                                : "Seleccionar familia"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Buscar familia..." />
                            <CommandEmpty>
                              No se encontró la familia.
                            </CommandEmpty>
                            <CommandGroup>
                              {families?.map((family: any) => (
                                <CommandItem
                                  value={family.name}
                                  key={family.id}
                                  onSelect={(value) => {
                                    form.setValue("family_id", family.id);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      family.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {family.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Nombre</FormLabel>
                      <Input
                        {...field}
                        placeholder="Nombre"
                        className="w-full"
                      />
                    </FormItem>
                  )}
                />
              </ContentRow>
              <ContentRow gap="5px">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Título</FormLabel>
                      <Input
                        {...field}
                        placeholder="Título"
                        className="w-full"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subTitle"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Sub título</FormLabel>
                      <Input
                        {...field}
                        placeholder="Sub título"
                        className="w-full"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alias"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Alianza</FormLabel>
                      <Input
                        {...field}
                        placeholder="Alias"
                        className="w-full"
                      />
                    </FormItem>
                  )}
                />
              </ContentRow>
              <ContentRow gap="5px">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Descripción Formal</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Descripción"
                        className="min-h-[120px] w-full rounded-sm hover:border-opacity-80"
                      />
                    </FormItem>
                  )}
                />
              </ContentRow>
              <ContentRow gap="5px">
                <FormField
                  control={form.control}
                  name="territorialScope"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Ambito regional</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Ambito regional"
                        className="min-h-[160px] w-full rounded-sm hover:border-opacity-80"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hiringConditions"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Condiciones de contratación</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Condiciones de contratación"
                        className="min-h-[160px] w-full rounded-sm hover:border-opacity-80"
                      />
                    </FormItem>
                  )}
                />
              </ContentRow>
            </ContentCell>
            <ContentCell gap="5px">
              <ContentRow gap="5px" align="space-between">
                <ContentRow gap="5px">
                  <FormField
                    control={form.control}
                    name="beneficiaries"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel>N° Cargas máximo</FormLabel>
                        <Input
                          {...field}
                          placeholder="N° Cargas máximo"
                          className="w-full"
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="minInsuredCompanyPrice"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel>N° mínimo beneficiarios</FormLabel>
                        <Input
                          {...field}
                          placeholder="N° mínimo beneficiarios"
                          className="w-full"
                        />
                      </FormItem>
                    )}
                  />
                </ContentRow>
                <ContentRow gap="20px">
                  <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel htmlFor="cost">Costo técnico ($)</FormLabel>
                        <Input {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isSubject"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 space-y-0 self-end">
                        <Checkbox
                          id="isSubject"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-8 w-8 border-dusty-gray border-opacity-40 hover:border-opacity-80"
                        />
                        <FormLabel className="text-lg " htmlFor="isSubject">
                          Afecto
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </ContentRow>
              </ContentRow>
              <ContentRow gap="5px" align="space-between">
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Frecuencia</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-sm border-dusty-gray border-opacity-40 py-6 hover:border-opacity-80">
                            <SelectValue placeholder="Seleccione frecuencia" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {frequencyList.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDay"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Día de pago</FormLabel>
                      <Input
                        {...field}
                        placeholder="Día de pago"
                        className="w-full"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Duración (meses)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-sm border-dusty-gray border-opacity-40 py-6 hover:border-opacity-80">
                            <SelectValue placeholder="Seleccione duración" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {termList.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </ContentRow>
            </ContentCell>
            <ContentCell gap="5px">
              <Table width="953px" height="347px">
                <TableHeader>
                  <TableCell width="385px">Servicio</TableCell>
                  <TableCell width="100px">Monto</TableCell>
                  <TableCell width="275px">Límite</TableCell>
                  <TableCell width="85px">Eventos</TableCell>
                  <TableCell width="85px">Carencia</TableCell>
                  <TableCellEnd />
                </TableHeader>
                <TableDetail>
                  {assistances?.map((item: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell width="385px">{item.name}</TableCell>
                      <TableCell width="100px" align="center">
                        {formatAmount(item.amount, item.currency)}
                      </TableCell>
                      <TableCell width="275px" align="center">
                        {item.maximum}
                      </TableCell>
                      <TableCell width="85px" align="center">
                        {item.events === 0 ? "Ilimitado" : item.events}
                      </TableCell>
                      <TableCell width="85px" align="center">
                        {item.lack}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableDetail>
              </Table>
              <ContentRow gap="10px" align="space-between">
                <ContentCellSummary>{`${
                  product?.assistances.length || 0
                } servicios`}</ContentCellSummary>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger className="h-10 w-10 rounded-full bg-teal-blue p-2 text-white hover:bg-teal-blue-400">
                    +
                  </DialogTrigger>
                  <DialogContent className="w-[890px]">
                    <DialogHeader>
                      <DialogTitle>Asistencia</DialogTitle>
                      <DialogDescription>
                        Llena el formulario para asignar una asistencia al
                        producto.
                      </DialogDescription>
                    </DialogHeader>
                    <ProductAssistance
                      form={form}
                      assistancesList={assistances}
                      setAssistances={setAssistances}
                      setIsOpen={setIsOpen}
                    />
                  </DialogContent>
                </Dialog>
              </ContentRow>
            </ContentCell>
          </ContentCell>
          <FloatMenu>
            <Button
              className="h-10 w-10 rounded-full bg-teal-blue-300 p-0 hover:bg-teal-blue"
              onClick={() => router.push("/")}
              type="button"
            >
              <Icon
                iconName="home"
                size="24px"
                className="cursor-pointer"
                button
              />
            </Button>
            <Button
              className="h-10 w-10 rounded-full bg-teal-blue-300 p-0 hover:bg-teal-blue"
              onClick={() => router.push("/masters/product")}
              type="button"
            >
              <Icon
                iconName="arrow_back"
                size="24px"
                className="cursor-pointer"
                button
              />
            </Button>
            <Button
              className="h-10 w-10 rounded-full bg-teal-blue-300 p-0 hover:bg-teal-blue"
              type="submit"
              disabled={isLoading}
            >
              <Icon
                iconName="save"
                size="24px"
                className="cursor-pointer"
                button
              />
            </Button>
          </FloatMenu>
        </form>
      </Form>
      <LoadingMessage showModal={isLoading} />
    </>
  );
};

export default ProductDetail;
