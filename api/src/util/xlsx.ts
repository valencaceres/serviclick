import xlsx from 'xlsx'
import path from 'path'
import fs from 'fs'
import { Response } from 'express';

const excelUpload = (summary: any, detail: any, fileName: any, res: Response) => {
  const workbook = xlsx.utils.book_new();
  const worksheetSalesData = xlsx.utils.json_to_sheet(summary);
  xlsx.utils.book_append_sheet(workbook, worksheetSalesData, 'Sales Data');
  const worksheetSalesDetail = xlsx.utils.json_to_sheet(detail);
  xlsx.utils.book_append_sheet(workbook, worksheetSalesDetail, 'Sales Detail');

  const xlsxToPath = path.join(__dirname, "../../", "xlsx");
  const filePath = path.join(xlsxToPath, `ventas-${fileName}.xlsx`);
  xlsx.writeFile(workbook, filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return res.status(500).json({ error: 'Error al leer el archivo' });
    }

    res.setHeader('Content-Disposition', `attachment; filename=ventas-${fileName}.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    const fileContent = fs.readFileSync(filePath);

    const base64Encoded = Buffer.from(fileContent).toString('base64');
    return res.status(200).json({ success: true, data: base64Encoded, error: null });
  });
};

export default excelUpload