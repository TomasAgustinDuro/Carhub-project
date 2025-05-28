import CarsRoutes from "./subRoutes/CarsRoutes.js";
import ReviewsRoutes from "./subRoutes/ReviewsRoutes.js";
import TurnRoutes from "./subRoutes/TurnRoutes.js";
import UserRoutes from "./subRoutes/UserRoutes.js";
import ImageRoutes from "./subRoutes/ImageRoutes.js";
import { VerifyToken } from "../auth/auth.js";
import UserController from "../controllers/UserController.js";

const allRoutes = (app) => {
  app.use("/admin", VerifyToken, UserRoutes);
  app.post("/login", UserController.login);
  // To production this has to be move to admin routes.
  app.post("/edmin/register", UserController.registerUser);
  app.use("/turns", TurnRoutes);
  app.use("/cars", CarsRoutes);
  app.use("/reviews", ReviewsRoutes);
  app.use("/images", ImageRoutes);
};

export default allRoutes;
