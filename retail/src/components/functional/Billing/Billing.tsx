import { useUI } from "~/store/hooks";
import { DataTable } from "./DataTable";

import { columns } from "./columns";
import { useRetail } from "~/store/hooks";
import { useEffect } from "react";
export function Billing() {
  const { retail } = useUI();
  const { summary: data, getDetailsByRetailId } = useRetail();
  useEffect(() => {
    if (retail) {
      getDetailsByRetailId(retail.id);
    }
  }, [retail, getDetailsByRetailId]);

  const newData = data?.detail?.map((detailItem) => {
    const [year, month, day] = detailItem.product.incorporation.split("-");

    const formattedDate = `${day}-${month}-${year}`;

    return {
      balance: detailItem.collection.due,
      charged: detailItem.collection.charged,
      customer_email: detailItem.customer.email,
      customer_name: detailItem.customer.name,
      customer_phone: detailItem.customer.phone,
      fee_value: detailItem.product.price,
      fees_charged:
        detailItem.collection.fee.quantity - detailItem.collection.fee.free,
      free_months: detailItem.collection.fee.free,
      incorporation: formattedDate,
      paid: detailItem.collection.paid,
      product_name: detailItem.product.name,
    };
  });
  if (!newData)
    return (
      <div className="w-full">
        <h2 className="text-center text-xl font-bold text-teal-blue">
          Sin datos disponibles...
        </h2>
      </div>
    );

  return (
    <div className="flex w-full flex-col items-center gap-2 pl-12">
      <DataTable columns={columns} data={newData} />
    </div>
  );
}
