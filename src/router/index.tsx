import { PDFSetting } from "@pages/index";
import { createBrowserRouter, Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [{ index: true, element: <PDFSetting /> }],
  },
]);

export default router;
