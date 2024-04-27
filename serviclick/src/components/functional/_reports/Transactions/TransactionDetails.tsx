import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/Card";
import { Button } from "~/components/ui/ButtonC";
import { TrashIcon, CalendarIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import moment from "moment";
import {
  DollarSignIcon,
  CreditCard,
  RefreshCcwIcon,
  CreditCardIcon,
  Loader2,
} from "lucide-react";
import { TransactionT } from "~/interfaces/transaction";
import { Skeleton } from "~/components/ui/Skeleton";
import { useTransaction } from "~/store/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/Table-ui";
import InputText from "~/components/ui/InputText";
import InputTextDate from "~/components/ui/InputTextDate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import Link from "next/link";
interface TransactionDetailsProps {
  transaction: TransactionT;
}
const TransactionDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getTransactionById, transaction, resetTransaction, isLoading } = useTransaction();
  useEffect(() => {
    resetTransaction();
    if (id) {
      getTransactionById(id as string);
    }
  }, [id]);

  return (
    <div>
      <Card className="flex flex-col gap-4 bg-white p-12">
        <h1 className="text-3xl font-semibold text-secondary-500">
          Detalle de suscripción
        </h1>
        {isLoading ? (
          <>
            <Skeleton className="h-[1200px] w-[1200px] bg-slate-200" />
          </>
        ) : (
          <>
            <HeaderCard transaction={transaction} />
            <div className="flex flex-col gap-8 md:flex-row">
              <CustomerAndPayment transaction={transaction} />
              <Payment transaction={transaction} />
            </div>
            <PaymentSection transaction={transaction} />
          </>
        )}
      </Card>
    </div>
  );
};

export default TransactionDetails;

function HeaderCard({ transaction }: TransactionDetailsProps) {
  function getFrequencyLabel(value: string) {
    switch (value) {
      case "1":
        return "Una vez";
      case "2":
        return "Semanal";
      case "3":
        return "Mensual";
      case "4":
        return "Anual";
      case "6":
        return "Bi-Anual";
      case "7":
        return "Quarterly";
      default:
        return "";
    }
  }
  function getStatusName(value: string) {
    switch (value) {
      case "1":
        return "Activa";
      case "2":
        return "Intento fallido 1";
      case "3":
        return "Intento fallido 2";
      case "4":
        return "Intento fallido 3";
      case "5":
        return "Fallida";
      case "6":
        return "No iniciada";
      case "7":
        return "Revertida";
      case "8":
        return "Expirada";
      case "9":
        return "Desactivada";
      case "10":
        return "Abandonada";
      case "11":
        return "Prueba";
      case "12":
        return "Recuperando";
      default:
        return "Desconocido";
    }
  }

  return (
    <Card className="w-full bg-primary-500 ">
      <CardHeader className="flex flex-row justify-between">
        <Button disabled>
          {" "}
          {getStatusName(transaction.statusSubscription)}
        </Button>
        <Link
          href={`https://app.reveniu.com/plan-admin/plan/${transaction.plan_id}`}
          target="_blank"
        >
          <Button className=" bg-secondary-500 ">
            {" "}
            Ir al plan en reveniu{" "}
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-12 md:flex-row">
        <div className="flex flex-col">
          <h2 className="max-w-sm text-3xl font-bold text-white ">
            {transaction.customer.name} {""} {transaction.product_name}
          </h2>
          <p className="text-2xl  font-semibold text-white">
            Frecuencia: {getFrequencyLabel(transaction.frequency)}
          </p>
          <p className="text-2xl font-semibold text-white">
            Monto: {transaction.is_uf === false ? "$" : "UF"}{" "}
            {transaction.plan_amount}
          </p>
        </div>

        <div className="flex  flex-col gap-2 md:flex-row">
          <ChangeMount transaction={transaction} />
          <ChangeDate transaction={transaction} />
          <DeleteSubscription transaction={transaction} />
        </div>
      </CardContent>
    </Card>
  );
}

function CustomerAndPayment({ transaction }: TransactionDetailsProps) {
  return (
    <>
      <Card className=" flex bg-gray-200 py-4">
        <CardContent className="flex flex-col gap-12  text-black md:flex-row">
          <div className="flex flex-col  text-[#2b3c4e] ">
            <h2 className="text-2xl font-bold">Cliente</h2>
            <p className="text-xl">
              {" "}
              {transaction.customer.name} {""}{" "}
            </p>
            <p className="text-xl">{transaction.customer.email}</p>
            <p className="text-xl">{transaction.customer.phone}</p>

            <p className="text-xl">
              Fecha de suscripción:{" "}
              {moment(transaction.created_on).format("DD/MM/YYYY/HH:mm")}
            </p>
            <p className="text-xl">
              Próxima fecha de cobro:{" "}
              {moment(transaction.next_due_date).format("DD/MM/YYYY/HH:mm")}
            </p>
          </div>
          <div className="flex flex-col justify-between ">
            <Card className="flex  h-3/4 w-2/4  flex-col items-center  justify-center  bg-gray-300 text-[#2b3c4e] md:w-full">
              <CardContent className="">
                <p className="text-center text-xl font-bold">
                  {transaction.paymentsArray.length}
                </p>
                <p className="max-w-24 text-center text-xl">
                  {transaction.paymentsArray.length > 1
                    ? "Pagos realizados"
                    : "Pago realizado"}
                </p>{" "}
              </CardContent>
            </Card>
            <Link
              href={`https://operaciones.serviclick.cl/entities/contractor/${transaction.customer_id}`}
              target="_blank"
            >
              <Button className=" bg-secondary-500 ">
                {" "}
                Ir a detalles del cliente{" "}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function Payment({ transaction }: TransactionDetailsProps) {
  return (
    <>
      <Card className="flex flex-col bg-gray-200 py-4">
        <CardContent className="flex flex-col gap-12 text-black md:flex-row">
          <div className="flex flex-col  text-[#2b3c4e] ">
            <h2 className="text-2xl font-bold">Método de pago</h2>
            <p className="text-xl">
              {transaction.payment_method.payment_method_type}
            </p>
            <p className="flex flex-row gap-2 text-xl">
              <CreditCardIcon className="h-8 w-8 " />{" "}
              {transaction.payment_method.last_4_card_digits}
            </p>
            <p className="text-xl">OneClick Mall </p>
          </div>
          <div className="flex flex-col gap-2">
            <ChangeCard transaction={transaction} />
          </div>
        </CardContent>
      </Card>
      <Card></Card>
    </>
  );
}

function PaymentSection({ transaction }: TransactionDetailsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Historial de Cobro</h2>
      <div className="mt-4 rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Orden de compra</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transaction.paymentsArray.map((payment, index) => (
              <TableRow key={index}>
                <TableCell>
                  {" "}
                  {moment(payment.issued_on).format("DD/MM/YYYY/HH:mm")}{" "}
                </TableCell>
                <TableCell>{payment.buy_order}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  {payment.gateway_response === "Approved"
                    ? "Aprobado"
                    : payment.gateway_response}
                </TableCell>{" "}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ChangeMount({ transaction }: TransactionDetailsProps) {
  const [open, setOpen] = useState(false);
  const [oldAmount, setOldAmount] = useState(0);
  const [newAmount, setNewAmount] = useState(0);
  const { updateAmount, isLoading } = useTransaction();

  const handleClickCancel = () => {
    setOpen(false);
    setNewAmount(0);
  };
  const handleClickConfirm = () => {
    updateAmount(newAmount, transaction.id);
    setOldAmount(newAmount);
    setNewAmount(0);
  };

  const handleChange = (e: any) => {
    setNewAmount(e.target.value);
  };
  useEffect(() => {
    setOldAmount(transaction.plan_amount);
  }, [transaction]);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button className="bg-secondary-500">
            {" "}
            <DollarSignIcon className="mr-2 h-8 w-8 text-white " /> Cambiar
            monto
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-200 text-[#2b3c4e]">
          <DialogHeader>
            <DialogTitle> Cambiar monto (CLP $)</DialogTitle>
            <DialogDescription>
              La suscripción pasará a cobrar el monto indicado desde su próxima
              fecha de cobro. Tu suscriptor será notificado del cambio
              inmediatamente por correo.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <InputText
              value={oldAmount.toString()}
              type="text"
              disabled
              label="Monto Actual"
            />

            <InputText
              value={newAmount.toString()}
              onChange={handleChange}
              label="¿Cúal es el nuevo monto?"
              type="number"
            />
          </div>
          <DialogFooter>
            <Button disabled={isLoading} onClick={handleClickCancel}>
              Cancelar
            </Button>
            <Button disabled={isLoading} onClick={handleClickConfirm}>
              {" "}
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Actualizando</span>
                </>
              ) : (
                "Confirmar"
              )}
            </Button>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ChangeDate({ transaction }: TransactionDetailsProps) {
  const [open, setOpen] = useState(false);
  const [oldAmount, setOldAmount] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const { updateDate, isLoading } = useTransaction();

  const handleClickCancel = () => {
    setOpen(false);
    setNewAmount(oldAmount);
  };
  const handleClickConfirm = () => {
    updateDate(newAmount, transaction.id);
    setOldAmount(newAmount);
  };

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    setNewAmount(inputValue);
  };
  useEffect(() => {
    const formattedDate = new Date(
      transaction.next_due_date
    ).toLocaleDateString();
    setOldAmount(formattedDate);
    setNewAmount(formattedDate);
  }, [transaction]);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button className="bg-secondary-500">
            {" "}
            <CalendarIcon className="mr-2 h-8 w-8 text-white" />
            Cambiar día de cobro
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-200 text-[#2b3c4e]">
          <DialogHeader>
            <DialogTitle> Cambiar día preferido de cobro</DialogTitle>
            <DialogDescription>
              Se cambia el día preferido de pago de una suscripción al próximo
              día calendario. Ejemplo, si hoy es 20 de mayo y deseas cambiarlo a
              los días 15, se cambiará la próxima fecha programada al 15 de
              junio y se realizarán los cobros todos los 15 de cada mes a partir
              de ese momento.{" "}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <InputTextDate
              onChange={handleChange}
              value={newAmount}
              type="date"
              label="Fecha"
            />
          </div>
          <DialogFooter>
            <Button disabled={isLoading} onClick={handleClickCancel}>
              Cancelar
            </Button>
            <Button disabled={isLoading} onClick={handleClickConfirm}>
              {" "}
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Actualizando</span>
                </>
              ) : (
                "Confirmar"
              )}
            </Button>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DeleteSubscription({ transaction }: TransactionDetailsProps) {
  const [open, setOpen] = useState(false);
  const { updateStatus, isLoading } = useTransaction();
  const handleClickCancel = () => {
    setOpen(false);
  };
  const handleClickConfirm = (isdeactivated: boolean) => {
    updateStatus(isdeactivated, transaction.id);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button className="bg-secondary-500">
            {" "}
            <TrashIcon className="mr-2 h-8 w-8 text-white" />
            Dar de baja
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-200 text-[#2b3c4e]">
          <DialogHeader>
            <DialogTitle>Dar de baja</DialogTitle>
            <DialogDescription>
              Si seleccionas ´Dar de baja´ la suscripción se detendrá
              inmediatamente.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button disabled={isLoading} onClick={handleClickCancel}>
              Cancelar
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => {
                handleClickConfirm(true);
              }}
            >
              {" "}
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Actualizando</span>
                </>
              ) : (
                "Dar de baja"
              )}
            </Button>{" "}
            <Button
              disabled={isLoading}
              onClick={() => {
                handleClickConfirm(false);
              }}
            >
              {" "}
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Actualizando</span>
                </>
              ) : (
                "Detener renovación"
              )}
            </Button>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ChangeCard({ transaction }: TransactionDetailsProps) {
  const [open, setOpen] = useState(false);
  const { isLoading, changeMethod } = useTransaction();
  const handleClickCancel = () => {
    setOpen(false);
  };
  const handleClickConfirm = () => {
    setOpen(false);
    changeMethod(transaction.id);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button className="bg-secondary-500">
            {" "}
            <CreditCard className="mr-2 h-8 w-8 text-white" />
            Cambiar tarjeta
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-200 text-[#2b3c4e]">
          <DialogHeader>
            <DialogTitle>
              Solicitar a tu cliente que registre una nueva tarjeta
            </DialogTitle>
            <DialogDescription>
              Se enviará un correo con instrucciones para que ingrese los datos
              de una nueva tarjeta para continuar con su suscripción. Si el
              proceso es exitoso, se reactivará la suscripción.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button disabled={isLoading} onClick={handleClickCancel}>
              Cancelar
            </Button>
            <Button disabled={isLoading} onClick={handleClickConfirm}>
              {" "}
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Actualizando</span>
                </>
              ) : (
                "Enviar"
              )}
            </Button>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
