import DatabaseService from '@services/database';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;

const port = PORT || 5000;

(async () => {
  await DatabaseService.connect();
  app.listen(port, () => console.log(`App running on port ${port}`));
})();
