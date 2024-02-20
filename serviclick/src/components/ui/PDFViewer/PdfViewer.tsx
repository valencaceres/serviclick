import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useMediaQuery } from "react-responsive";
import ButtonIcon from "../ButtonIcon";

import styles from "./PDFViewer.module.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IPdfViewer {
  file?: string;
  base64?: string;
}

const PDFViewer = ({ file, base64 }: IPdfViewer) => {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);
  const [width, setWidth] = useState<number>(500);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  const handleDocumentLoadError = (error: any) => {
    setError(true);
  };

  const updateWidth = () => {
    setWidth(isMobile ? window.innerWidth : 600);
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [isMobile]);

  return (
    <div className={styles.contentMainPdf}>
      <div className={styles.controls}>
        <ButtonIcon
          onClick={handlePreviousPage}
          iconName="keyboard_double_arrow_left"
          disabled={currentPage === 1 ? true : false}
        />
        <h5>
          {currentPage} de {numPages}
        </h5>

        <ButtonIcon
          onClick={handleNextPage}
          iconName="keyboard_double_arrow_right"
          disabled={currentPage === numPages ? true : false}
        />
      </div>
      <div className={styles.pdfViewer} style={{ width }}>
        <Document
          file={base64 ? { data: atob(base64 as string) } : file}
          onLoadSuccess={handleDocumentLoadSuccess}
          onLoadError={handleDocumentLoadError}
        >
          <Page pageNumber={currentPage} width={width} />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
