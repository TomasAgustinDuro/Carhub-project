import CarsRoutes from "./subRoutes/CarsRoutes";
import ReviewsRoutes from "./subRoutes/ReviewsRoutes";
import TurnRoutes from "./subRoutes/TurnRoutes";
import UserRoutes from "./subRoutes/UserRoutes";

const allRoutes = (app) => {
  app.use("/admin", UserRoutes);
  app.use("/turns", TurnRoutes);
  app.use("/cars", CarsRoutes);
  app.use("/reviews", ReviewsRoutes);
};

export default allRoutes;
