import express from 'express';
import cors from 'cors';
import kpiRoutes from './routes/kpi.js';
import applicationRoutes from './routes/applications.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', kpiRoutes);
app.use('/api', applicationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
