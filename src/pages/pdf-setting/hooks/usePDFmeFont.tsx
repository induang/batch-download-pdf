import type { Font } from "@pdfme/common";
export function usePDFmeFont() {
  const font: Font = {
    ja_noto_sans: {
      // data: b64toUint8Array(JA_NOTO_SANS_BASE64),
      data: "",
      fallback: true,
    },
  };
  return { font };
}
