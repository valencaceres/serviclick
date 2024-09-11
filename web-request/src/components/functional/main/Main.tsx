import React, { useState, useEffect } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/InputText";
import { ContentCol, ContentRow } from "@/components/layout/General/General";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableDetail,
  TableCellEnd,
} from "@/components/ui/Table";

import { useContractor } from "@/store/hooks";
import format from "@/utils/format";

const Main = () => {
  const [rut, setRut] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [openTable, setOpenTable] = useState(0);
  const {
    getByRutOrName,
    getContractorById,
    customer,
    contractor,
    contractorIsLoading,
    reset,
    contractorIsError
  } = useContractor();

  const rutFormated = format(rut);

  const handleClick = () => {
    reset();
    getByRutOrName(rutFormated);
    setOpenTable(1);
  };

  useEffect(() => {
    if (customer.data.length > 0) {
      getContractorById(customer.data[0].id);
    }
  }, [customer]);

  function extractBalances(data: any): number[] {
    let result: number[] = [];
    
    if (Array.isArray(data)) {
        for (const item of data) {
            result = result.concat(extractBalances(item)); // Recursión para manejar anidamientos
        }
    } else if (data && typeof data === 'object' && 'balance' in data) {
        result.push(data.balance);
    }

    return result;
  }

  useEffect(() => {
    if (contractor.origins.length > 0) {
      const balances = contractor.origins.flatMap((origin) =>
        extractBalances(origin.balance)
      );
      console.log('%cweb-request\src\components\functional\main\Main.tsx:66 ', 'color: #007acc;', 'entro');
      const hasActiveBalance = balances.some((balance) => typeof balance === 'number' && balance !== null);
      console.log('%cweb-request\src\components\functional\main\Main.tsx:62 hasActiveBalance', 'color: #007acc;', hasActiveBalance);
      setIsActive(hasActiveBalance);
    }
  }, [contractor]);

  return (
    <ContentCol gap="10px" width="500px">
      <ContentRow>
        <h1 className="text-xl">
          Inserta el rut de una persona para saber su estado
        </h1>
      </ContentRow>
      <Input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRut(event.target.value);
        }}
      />
      <Button onClick={handleClick} />
      {openTable === 1 ? (
    contractorIsLoading ? (
      <div className="flex justify-center text-blue-600">
        Cargando...
      </div>
  ) : contractorIsError ? (
    <div className="flex justify-center text-red-600">
      No existe el rut
    </div>
  ) : (
    <div>
      {!isActive ? (
        <Table height="80px">
          <TableHeader>
            <TableRow>
              <TableCell width="400px">Nombre</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width="90px">Estado</TableCell>
            </TableRow>
            <TableCellEnd></TableCellEnd>
          </TableHeader>
          <TableDetail>
            <TableRow>
              <TableCell width="400px">{customer.data[0].name}</TableCell>
              <TableCell width="90px">Activo</TableCell>
            </TableRow>
          </TableDetail>
        </Table>
      ) : (
        <Table height="80px">
          <TableHeader>
            <TableRow>
              <TableCell width="400px">Nombre</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width="90px">Estado</TableCell>
            </TableRow>
            <TableCellEnd></TableCellEnd>
          </TableHeader>
          <TableDetail>
            <TableRow>
              <TableCell width="400px">{customer.data[0].name}</TableCell>
              <TableCell width="90px">No Activo</TableCell>
            </TableRow>
          </TableDetail>
        </Table>
      )}
    </div>
  )
) : null}
    </ContentCol>
  );
};

export default Main;
