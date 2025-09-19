import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NavBar from "../components/NavBar";
import ProtectedRoute from "./ProtectedRoute";
import User from "../pages/User";
import RoleRoute from "./RoleRoute";
import { ROLES } from "../constants/roles";

const AppRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[ROLES.ADMIN]}>
                <User />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
