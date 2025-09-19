import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const state = useSelector((s) => s.auth); // Get Auth Detailed
  if (!state.token || !state.user) // Check Auth Details valid or not
    return <Navigate to="/login" replace />; // if not valid, redirect to login
  return children; // otherwise display their children 
};

export default ProtectedRoute;

// < App > // parent
// <Home > //child
//   <Button></Button> // grand child
//   </Home>
//    </App >
