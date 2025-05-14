import "./App.scss";
import { Navbar, Footer } from "./components";
import BuyCar from "./pages/buyCar/BuyCar";
import { BrowserRouter as Router, Routes, Route, json } from "react-router-dom";
import SellCar from "./pages/sellCar/SellCar";
import DetailCar from "./pages/buyCar/detailCar/DetailCar";
import Preguntas from "./pages/nosotros/preguntas/Preguntas";
import History from "./pages/nosotros/history/History";
import Reviews from "./pages/nosotros/Reviews/Reviews";
import Home from "./pages/home/Home";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import EditCar from "./pages/Private/Admin-Dashboards/Cars/EditCar";
import DeleteCars from "./pages/Private/Admin-Dashboards/Cars/DeleteCars";
import AddCars from "./pages/Private/Admin-Dashboards/Cars/AddCars";
import Dashboard from "./pages/Private/Admin-Dashboards/Dashboard/Dashboard";
import CreateUser from "./pages/Private/Admin-CreateUser/CreateUser";
import Login from "./pages/Private/Admin-Login/Login";
import Turns from "./pages/Private/Admin-Dashboards/Turns/Turns";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* rutas protegidas */}

        <Route
          path="/admin/"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/cars"
          element={
            <PrivateRoutes>
              <AddCars />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/cars/edit/:id"
          element={
            <PrivateRoutes>
              <EditCar />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/cars/delete"
          element={
            <PrivateRoutes>
              <DeleteCars />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/turns"
          element={
            <PrivateRoutes>
              <Turns />
            </PrivateRoutes>
          }
        />
        <Route path="/admin/user/create" element={<CreateUser />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/buy-car" element={<BuyCar />} />
        <Route path="/sell-car" element={<SellCar />} />
        <Route path="/detail-car/:id" element={<DetailCar />} />
        <Route path="/preguntas" element={<Preguntas />} />
        <Route path="/history" element={<History />} />
        <Route path="/reviews" element={<Reviews />} />

        <Route path="*" element={<>Not Found</>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
