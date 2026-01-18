import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import blueprintRoutes from './routes/blueprintRoutes';
import contractRoutes from './routes/contractRoutes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/blueprints', blueprintRoutes);
app.use('/api/contracts', contractRoutes);

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.send('Contract Management API is running...');
});

export default app;