import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "../../ui/Table";
import Icon from "../../ui/Icon";

import { useCase } from "~/store/hooks/useCase";
import { useQueryAssistances, useQueryCase } from "../../../hooks/query";

import { useRouter } from "next/router";

const CaseServiceTable = ({
  product,
  assistance,
  formValues,
  setFormValues,
}: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = useState<string | null>(null);

  const { caseData, getById } = useCase();
  const { data: assistanceValues } = useQueryAssistances().useGetValues(
    assistance?.id
  );
  const { data: insuredValues } = useQueryAssistances().useGetValuesById(
    caseData?.insured?.id,
    assistance?.id,
    product?.id
  );

  const { mutate: assignValue } = useQueryAssistances().useAssignValue();

  const handleSubmit = (e: any, data: any) => {
    e.preventDefault();
    const newValueInput = e.target.elements.newValue;
    assignValue(
      {
        lead_id: caseData?.lead_id,
        product_id: caseData?.product.id,
        insured_id: data?.insured_id,
        value_id: data?.value_id,
        value: newValueInput.value,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["assistanceValueById"]);
          setEditingId(null);
        },
      }
    );
  };

  return (
    <Table height="287px">
      <TableHeader>
        <TableCell width="250px" align="center">
          Dato
        </TableCell>
        <TableCell width="260px">Valor</TableCell>
        <TableCellEnd />
      </TableHeader>
      <TableDetail>
        {assistanceValues?.length > 0 ? (
          assistanceValues?.map((item: any, idx: number) => (
            <TableRow key={item.id}>
              <TableCell width="250px" align="center">
                {item.name}
              </TableCell>

              <TableCell width="260px" align="center">
                {insuredValues &&
                insuredValues.find((i: any) => i.value_name === item.name) ? (
                  <>
                    {editingId === item.id ? (
                      <form
                        onSubmit={(e: any) =>
                          handleSubmit(e, {
                            lead_id: product?.lead_id,
                            product_id: product?.id,
                            insured_id: caseData?.insured?.id,
                            value_id: item.id,
                          })
                        }
                        className="flex items-center gap-4"
                      >
                        <input
                          type="text"
                          className="rounded-md bg-transparent px-2 font-medium text-secondary-500 focus:bg-white"
                          placeholder="Ingrese valor"
                          id="newValue"
                          defaultValue={
                            insuredValues.find(
                              (i: any) => i.value_name === item.name
                            )?.value
                          }
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              [item.id]: e.target.value,
                            })
                          }
                        />
                        <button>
                          <Icon iconName="check" button={true} />
                        </button>
                      </form>
                    ) : (
                      <div className="relative flex h-full w-full items-center justify-center">
                        <p className="font-semibold">
                          {
                            insuredValues.find(
                              (i: any) => i.value_name === item.name
                            )?.value
                          }
                        </p>
                        <button
                          className="absolute right-0 top-1"
                          onClick={() => setEditingId(item.id)}
                        >
                          <Icon iconName="edit" button={true} />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <form
                    onSubmit={(e: any) =>
                      handleSubmit(e, {
                        lead_id: product?.lead_id,
                        product_id: product?.id,
                        insured_id: caseData?.insured?.id,
                        value_id: item.id,
                      })
                    }
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      className="rounded-md bg-transparent px-2 font-medium text-secondary-500 focus:bg-white"
                      placeholder="Ingrese valor"
                      id="newValue"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          [item.id]: e.target.value,
                        })
                      }
                    />
                    <button>
                      <Icon iconName="check" button={true} />
                    </button>
                  </form>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell width="510px" align="center">
              No hay datos disponibles en este momento
            </TableCell>
          </TableRow>
        )}
      </TableDetail>
    </Table>
  );
};

export default CaseServiceTable;
