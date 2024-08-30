import { generate } from "@pdfme/generator";
import { barcodes, image, text } from "@pdfme/schemas";
import JSZip from "jszip";

self.onmessage = async function (e) {
  const { template, inputs, font, batchSize, total } = e.data;
  let generatedCount = 0;
  const zip = new JSZip();
  console.log(font);
  for (let i = 0; i < total; i += batchSize) {
    const batchPromises = Array.from({ length: batchSize }).map(
      async (_, index) => {
        const pdf = await generate({
          template,
          inputs,
          plugins: { text, image, qrcode: barcodes.qrcode },
        }).catch((error) => {
          self.postMessage({
            type: "error",
            message: error.message,
            stack: error.stack,
          });
        });
        await sleep(1200);
        const pdfBlob = new Blob([pdf], { type: "application/pdf" });
        zip.file(`file-${i + index + 1}.pdf`, pdfBlob);
        generatedCount++;
        postMessage({ progress: (generatedCount / total) * 100 });
      }
    );

    await Promise.all(batchPromises);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" }).catch((error) => {
    self.postMessage({
      type: "error",
      message: error.message,
      stack: error.stack,
    });
  });
  postMessage({ completed: true, zipBlob });
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
