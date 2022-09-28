import { useState, useEffect } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import ComboBox from "../../../ui/ComboBox";

import ButtonIcon from "../../../ui/ButtonIcon";
import InputText from "../../../ui/InputText";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
} from "../../../ui/Table";

/*
select	DATE(sub.date) as date,
        sub.date :: timestamp :: time as time,
        case when cus.name is null then com.companyname else cus.name end as client_name,
        pro.name,
        1 as num_insured,
        sub.event,
        case when cus.name is null then pro.companyprice  else pro.customerprice  end as client_name
from	  app.lead lea
        inner join app.subscription sub on lea.subscription_id = sub.subscription_id
        inner join app.leadproduct lpr on lea.id = lpr.lead_id
        inner join app.product pro on lpr.product_id = pro.id
        inner join app.leadinsured lin on lea.id = lin.lead_id
        left outer join app.customer cus on lea.customer_id = cus.id
        left outer join app.company com on lea.company_id = com.id
order 	by
        sub.subscription_id,
        sub.date
*/

const TransactionsList = () => {
  return (
    <ContentCell gap="5px">
      <ContentRow gap="5px" align="center">
        <ComboBox
          label="Canal"
          width="230px"
          value=""
          onChange={() => {}}
          placeHolder=":: Seleccione canal ::"
          data={[]}
          dataValue="id"
          dataText="name"
        />
        <ComboBox
          label="Tipo cliente"
          width="230px"
          value=""
          onChange={() => {}}
          placeHolder=":: Seleccione tipo cliente ::"
          data={[]}
          dataValue="id"
          dataText="name"
        />
        <InputText width="170px" label="Rut" value="" />
        <ComboBox
          label="Período"
          width="230px"
          value=""
          onChange={() => {}}
          placeHolder=":: Seleccione período ::"
          data={[]}
          dataValue="id"
          dataText="name"
        />
        <ComboBox
          label="Estado transacción"
          width="170px"
          value=""
          onChange={() => {}}
          placeHolder=":: Seleccione estado transacción ::"
          data={[]}
          dataValue="id"
          dataText="name"
        />
        <ButtonIcon iconName="search" color="gray" />
      </ContentRow>
      <Table width="1149px" height="422px">
        <TableHeader>
          <TableCell width="69px" align="center">
            #
          </TableCell>
          <TableCell width="95px">Fecha</TableCell>
          <TableCell width="55px">Hora</TableCell>
          <TableCell width="421px">Cliente</TableCell>
          <TableCell width="197px">Producto</TableCell>
          <TableCell width="83px">N° Aseg.</TableCell>
          <TableCell width="72px">Estado</TableCell>
          <TableCell width="85px">Monto</TableCell>
          <TableCell width="49px"></TableCell>
        </TableHeader>
        <TableDetail></TableDetail>
      </Table>
      <ContentRow gap="5px">
        <ContentCellSummary>registros</ContentCellSummary>
        <ContentCellSummary>asegurados</ContentCellSummary>
        <ContentCellSummary>Total</ContentCellSummary>
      </ContentRow>
    </ContentCell>
  );
};

export default TransactionsList;
