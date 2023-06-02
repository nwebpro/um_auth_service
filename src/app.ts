import express, { Application } from "express";
import cors from "cors";
const app: Application = express();

// Application route import
import UserRouter from "./app/modules/Users/Users.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

// Middleware
app.use(cors());
// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/api/v1/users/", UserRouter);

// Testing route
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
// 	throw new ApiError(400, 'WOre baba re error');
// });

// Global error handler

app.use(globalErrorHandler);

export default app;
