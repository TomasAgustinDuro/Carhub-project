import { Navigate, Routes, Route } from "react-router-dom";
import { AdminCars, AdminTurns } from "../pages/Private";
import { useAuth } from "../Context/AuthContext";
import General from "../pages/Private/Admin-Dashboards/General/General";

function PrivateRoutes() {
  const { isOnline } = useAuth();

  return (
    <>
      {isOnline ? (
        <Routes>
          <Route path='/' element ={<General/>} />
          <Route path='/cars' element={<AdminCars />} />
          <Route path='/turns' element={<AdminTurns />} />
          <Route path='/general' element={<General />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default PrivateRoutes;
