import "./App.scss";
import { Navbar, Footer } from "./components";
import BuyCar from "./pages/buyCar/BuyCar";
import Preguntas from "./pages/nosotros/preguntas/Preguntas";
import Dolar from "./pages/Dolar/Dolar";
import DetailCar from "./pages/buyCar/detailCar/DetailCar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reviews from "./pages/nosotros/Reviews/Reviews";
import { Home } from "./pages/home";
import History from "./pages/nosotros/history/History";
import { SellCar } from "./pages";
import { Login, CreateUser } from "./pages/Private";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preguntas" element={<Preguntas />} />
          <Route path="/dolar" element={<Dolar />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/history" element={<History />} />
          <Route path="/buy-car" element={<BuyCar />} />
          <Route path="/sell-car" element={<SellCar />} />
          <Route path="/detail-car/:id" element={<DetailCar />} />
          <Route path="/admin/*" element={<PrivateRoutes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="*" element={<>Not Found</>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
