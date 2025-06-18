import express from 'express';
import cors from 'cors';
import kpiRoutes from './routes/kpi.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', kpiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
