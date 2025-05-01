import express from "express";
import cors from "cors";
import allRoutes from "../routes/routes";

// TODO: Move routes to another specific file for that.
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

allRoutes(app);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
