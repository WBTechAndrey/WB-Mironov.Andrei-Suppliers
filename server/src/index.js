import express from 'express';
import cors from 'cors';
import serverRoutes from './routes/serverRoutes.js';
import { PORT } from './config/index.js';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(serverRoutes);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
