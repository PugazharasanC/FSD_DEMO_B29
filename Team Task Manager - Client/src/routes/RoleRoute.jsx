
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, allowedRoles = [] }) => {
  const user = useSelector((s) => s.auth.user);
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role))
    return (
      <div className="text-red-500 font-bold text-center">Access Denied</div>
    );
  return children;
};

export default RoleRoute;
