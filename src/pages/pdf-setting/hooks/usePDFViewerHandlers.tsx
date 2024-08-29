import { getInputFromTemplate } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { barcodes, image, text } from "@pdfme/schemas";
import { Viewer } from "@pdfme/ui";
import type { MutableRefObject, RefObject } from "react";

// import { usePDFmeFont } from "./usePDFmeFont";

interface PDFViewerHandlersProps {
  template: any;
  viewer: MutableRefObject<Viewer | null>;
  containerRef: RefObject<HTMLElement>;
}
export function usePDFViewerHandlers({
  template,
  viewer,
  containerRef,
}: PDFViewerHandlersProps) {
  // const { font } = usePDFmeFont();
  const savePDFChange = async (...inputs: any[]) => {
    if (containerRef.current) {
      viewer.current = new Viewer({
        domContainer: containerRef.current,
        template,
        plugins: { text, image, qrcode: barcodes.qrcode },
        inputs: [Object.assign(getInputFromTemplate(template)[0], ...inputs)],
        // options: {
        //   font,
        // },
      });
    }
  };

  const previewPDFContent = async (...inputs: any[]) => {
    const pdf = await generate({
      template,
      plugins: { text, image, qrcode: barcodes.qrcode },
      inputs: [Object.assign(getInputFromTemplate(template)[0], ...inputs)],
      // options: { font },
    });
    const blob = new Blob([pdf.buffer], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob));
  };

  return { savePDFChange, previewPDFContent };
}
