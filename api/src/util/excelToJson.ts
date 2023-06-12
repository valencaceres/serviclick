export default function excelToJson(
  xlsData: any,
  leadId: string,
  productId: string
) {
  const jsonData = xlsData.map((row: any) => ({
    lead_id: leadId,
    product_id: productId,
    data: [
      {
        rut: row.Rut,
        name: row.Nombres,
        paternalLastName: row["Apellido paterno"],
        maternalLastName: row["Apellido materno"],
        birthDate: row["Fecha de nacimiento (yyyy-mm-dd)"],
        address: row["Dirección"],
        district: row["Comuna"],
        email: row["E-mail"],
        phone: row["Teléfono"],
        values: [],
        beneficiaries: [],
      },
    ],
  }));

  return jsonData;
}
