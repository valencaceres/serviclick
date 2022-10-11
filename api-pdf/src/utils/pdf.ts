import PDFDocument from "pdfkit-table";
import fs from "fs";

const pdfNewDocument = (path: string) => {
  const hMargin = 70;
  const paragraphWidth = 612 - hMargin * 2;

  const doc = new PDFDocument({
    size: "LETTER",
    margins: {
      top: 100,
      bottom: 70,
      left: hMargin,
      right: hMargin,
    },
    bufferPages: true,
  });

  doc.pipe(fs.createWriteStream(path));

  return {
    doc,
    hMargin,
    paragraphWidth,
    fontName: "Times-Roman",
    fontNameBold: "Times-Bold",
    fontSize: 12,
  };
};

const pdfTextLine = (
  pdf: any,
  text: string,
  align: string,
  bold: boolean,
  moveDown: boolean
) => {
  const { doc, fontName, fontNameBold, fontSize, paragraphWidth } = pdf;

  moveDown && doc.moveDown();

  doc.font(bold ? fontNameBold : fontName, fontSize);
  doc.text(text, {
    width: paragraphWidth,
    align: align,
  });
};

const pdfTable = (pdf: any, headers: any, data: any) => {
  const { doc } = pdf;

  doc.moveDown();

  const table = {
    divider: {
      header: { disabled: false, width: 2, opacity: 1 },
      horizontal: { disabled: false, width: 0.5, opacity: 0.5 },
    },
    headers,
    datas: data,
  };

  doc.table(table);
};

const pdfHeaderAndFooter = (pdf: any) => {
  const { doc, hMargin, paragraphWidth, fontNameBold, fontSize } = pdf;

  const range = doc.bufferedPageRange();

  for (let i = 0; i < range.start + range.count; i++) {
    doc.switchToPage(i);

    doc.image("./img/logo.jpg", hMargin, 40, {
      fit: [121, 25],
      align: "center",
      valign: "center",
    });

    const pageNumber = `Página ${i + 1} de ${range.count}`;

    var widthText = doc.widthOfString(pageNumber);

    doc
      .font(fontNameBold, fontSize)
      .text(pageNumber, hMargin + (paragraphWidth - widthText) / 2, 740, {
        lineBreak: false,
      });
  }

  doc.flushPages();
};

const pdfEnd = (pdf: any, res: any) => {
  const { doc } = pdf;

  doc.pipe(res);
  doc.end();
};

export { pdfNewDocument, pdfTextLine, pdfTable, pdfHeaderAndFooter, pdfEnd };
