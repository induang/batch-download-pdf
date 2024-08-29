import { getInputFromTemplate } from "@pdfme/common";
import { Button, Modal, Progress } from "antd";
import { saveAs } from "file-saver";
import { useState } from "react";

import template from "@/shared/templates/notification-setting.json";

import { usePDFmeFont } from "../hooks";
export const DownloadModal = () => {
  const { font } = usePDFmeFont();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const initAndDownload = () => {
    const pdfWorker = new Worker(
      new URL("/src/shared/web-workers/batch-download-pdf.js", import.meta.url),
      { type: "module" }
    );
    // Web Worker 消息处理
    pdfWorker.onmessage = (e) => {
      const { progress, completed, zipBlob } = e.data;

      if (progress !== undefined) {
        setProgress(progress);
      }

      if (completed) {
        saveAs(zipBlob, "pdfs.zip");
        setProgress(0);
        console.log("finish");
      }
    };

    pdfWorker.onerror = (e) => {
      console.error(e);
    };
    pdfWorker.postMessage({
      template,
      inputs: getInputFromTemplate(template),
      font,
      batchSize: 10, // 每次生成10个PDF
      total: 100, // 总共生成100个PDF
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>下载</Button>
      <Modal
        title="正常下载 离开页面则丢失进度"
        open={open}
        onCancel={() => setOpen(false)}
        okText="下载"
        onOk={initAndDownload}
        okButtonProps={{ disabled: !!progress }}
      >
        <Progress percent={progress} className="mt-4" />
      </Modal>
    </>
  );
};
