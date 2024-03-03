import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { createTResult } from "./core/mappers/tresult.mapper";

//rutas
import indexRoute from "./routes/index.route";
import userRoute from "./routes/user.route";
import { apiValidator } from "./core/middlewares/schema-validator.middleware";

const app = express();

const PORT = 4000;

app.use([express.json(), cors(), helmet()]);

app.use(
  "/swagger",
  swaggerUi.serve,
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const swaggerDocument = YAML.load("./swagger.yaml");
    const swaggerUiHandler = swaggerUi.setup(swaggerDocument);
    swaggerUiHandler(req, res, next);
  }
);
app.use(apiValidator());

app.use("/", indexRoute);
app.use("/users", userRoute);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res
      .status(err.status || 500)
      .json(createTResult<any>(null, [err.message, err.errors]));
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
