import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
const app: Application = express();

// Application route import
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';

// Middleware
app.use(cors());
// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/', routes);

// Testing route
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
// 	throw new ApiError(400, 'Ore baba re error');
// });

// Global error handler
app.use(globalErrorHandler);

// Handle Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

export default app;
