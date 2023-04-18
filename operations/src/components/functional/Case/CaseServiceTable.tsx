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

import { useCase } from "../../../store/hooks/useCase";
import { useQueryAssistances } from "../../../hooks/query";

const CaseServiceTable = ({ product }: any) => {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data } = useCase();
  const { data: assistanceValues } = useQueryAssistances().useGetValues(
    product?.assistance.id
  );

  const { data: insuredValues } = useQueryAssistances().useGetValuesById(
    data?.beneficiary.id,
    product?.assistance.id,
    product?.id
  );

  const { mutate: assignValue } = useQueryAssistances().useAssignValue();

  const handleSubmit = (e: any, data: any) => {
    e.preventDefault();
    const newValueInput = e.target.elements.newValue;
    assignValue(
      {
        lead_id: data?.lead_id,
        product_id: data?.product_id,
        insured_id: data?.insured_id,
        value_id: data?.value_id,
        value: newValueInput.value,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["assistanceValueById"]);
          if (isEditing) setIsEditing(false);
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
                    {isEditing ? (
                      <form
                        onSubmit={(e: any) =>
                          handleSubmit(e, {
                            lead_id: product?.lead_id,
                            product_id: product?.id,
                            insured_id: data?.beneficiary.id,
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
                          defaultValue={
                            insuredValues.find(
                              (i: any) => i.value_name === item.name
                            )?.value
                          }
                        />
                        <button>
                          <Icon iconName="check" button={true} />
                        </button>
                      </form>
                    ) : (
                      <div className="relative flex w-full justify-center">
                        <p className="font-semibold">
                          {
                            insuredValues.find(
                              (i: any) => i.value_name === item.name
                            )?.value
                          }
                        </p>
                        <button
                          className="absolute right-0 top-0"
                          onClick={() => setIsEditing(true)}
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
                        insured_id: data?.beneficiary.id,
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
