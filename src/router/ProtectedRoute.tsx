import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({
  user = true,
  redirectPath = "/",
  children,
}: {
  user: any;
  redirectPath: string;
  children: React.ReactNode;
}) => {
  if (user) {
    return children;
  } else {
    return <Navigate to={redirectPath} replace />;
  }
};
