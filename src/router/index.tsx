import { OtherPage, PDFSetting } from "@pages/index";
import { createBrowserRouter, Outlet } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Outlet />,
      children: [
        { index: true, element: <PDFSetting /> },
        { path: "other", element: <OtherPage /> },
      ],
    },
  ],
  { basename: "/batch-download-pdf" }
);

export default router;
