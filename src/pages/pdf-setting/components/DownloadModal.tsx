import { getInputFromTemplate } from "@pdfme/common";
import { Button, Modal, Progress } from "antd";
import { saveAs } from "file-saver";
import { useState } from "react";

import { useWebworker } from "@/contexts/useWebworker";
import template from "@/shared/templates/notification-setting.json";

import { usePDFmeFont } from "../hooks";
export const DownloadModal = () => {
  const { font } = usePDFmeFont();
  const [open, setOpen] = useState(false);
  const { initWorker, postMessage, onMessage, progress, setProgress } =
    useWebworker();

  const initAndDownload = () => {
    try {
      initWorker("/src/shared/web-workers/batch-download-pdf.js");
      postMessage({
        template,
        inputs: getInputFromTemplate(template),
        font,
        batchSize: 10, // 每次生成10个PDF
        total: 100, // 总共生成100个PDF
      });
      onMessage((e) => {
        const { progress, completed, zipBlob } = e.data;

        if (progress !== undefined && setProgress !== undefined) {
          setProgress(progress);
        }

        if (completed && setProgress !== undefined) {
          saveAs(zipBlob, "pdfs.zip");
          setProgress(0);
          console.log("finish");
        }
      });
    } catch (e) {
      console.log(e);
    }
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
