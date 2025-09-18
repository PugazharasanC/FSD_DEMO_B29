import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="font-bold underline text-3xl text-center">Home Page</div>}></Route>
    </Routes>
  );
};

export default AppRoutes;
