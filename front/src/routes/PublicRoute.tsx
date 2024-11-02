import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
// import { LinearProgress } from "@mui/material";
// import { DisabledBackground } from "../styles/customComponents";

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  // const preferences = localStorage.getItem("preferences");
  // if (preferences) {
  //   return <Navigate to="/preferences" />;
  // }
  // if (isLoading) {
  //   return (
  //     <>
  //       <LinearProgress sx={{ zIndex: 2 }} />
  //       <DisabledBackground />
  //     </>
  //   );
  // }
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
