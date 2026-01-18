import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('Contract Management API is running...');
});

export default app;