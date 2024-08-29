import type { Font } from "@pdfme/common";
import { b64toUint8Array } from "@pdfme/common";

import { JA_NOTO_SANS_BASE64 } from "../ja-noto-base64";
export function usePDFmeFont() {
  const font: Font = {
    ja_noto_sans: {
      data: b64toUint8Array(JA_NOTO_SANS_BASE64),
      fallback: true,
    },
  };
  return { font };
}
