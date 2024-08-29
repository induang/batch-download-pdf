import { getInputFromTemplate } from "@pdfme/common";
import { barcodes, image, text } from "@pdfme/schemas";
import { Viewer } from "@pdfme/ui";
import { useEffect, useRef } from "react";

import { usePDFmeFont } from "./usePDFmeFont";

interface InitPDFViewerProps {
  template: any;
}

export function useInitPDFViewer({ template }: InitPDFViewerProps) {
  const viewer = useRef<Viewer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { font } = usePDFmeFont();

  useEffect(() => {
    if (containerRef.current) {
      viewer.current = new Viewer({
        domContainer: containerRef.current,
        template,
        plugins: { text, image, qrcode: barcodes.qrcode },
        inputs: getInputFromTemplate(template),
        options: { font },
      });
    }
  }, [containerRef]);
  return { viewer, containerRef };
}
