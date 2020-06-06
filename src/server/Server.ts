import express from 'express';
import cors from 'cors';

import Routes from './Routes';
import { serverConfig } from '../config/BotConfig';

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routes);

app.listen(serverConfig.port, (): void => {
  console.log(`Server listening on ${serverConfig.port}`)
});