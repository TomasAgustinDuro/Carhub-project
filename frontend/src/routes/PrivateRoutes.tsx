import { Navigate, Routes, Route } from "react-router-dom";
import { AdminCars, AdminTurns } from "../pages/Private";
import { useAuth } from "../Context/AuthContext";
import General from "../pages/Private/Admin-Dashboards/General/General";
import DeleteCars from "../pages/Private/Admin-Dashboards/Cars/edit-delete/DeleteCars";
import EditCar from "../pages/Private/Admin-Dashboards/Cars/edit-delete/edit/EditCar";

function PrivateRoutes() {
  const { isOnline } = useAuth();
 
  return (
    <>
      {isOnline ? (
         <Routes>
         <Route path='/' element={<General />} />
         <Route path='/cars' element={<AdminCars />} />
         <Route path='/cars/edit/:id' element={<EditCar />} />
         <Route path='/cars/delete' element={<DeleteCars />} />
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
