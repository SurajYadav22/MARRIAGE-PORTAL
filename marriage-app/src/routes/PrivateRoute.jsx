import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

const PrivateRoute = ({ children }) => {
  const { isAdmin, isUser } = useContext(AuthContext);

  if (!isUser && !isAdmin) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
