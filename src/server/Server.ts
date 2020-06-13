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

setInterval(() => {
  fetch('https://miguel-api.herokuapp.com/api/services/verify', {
    method: 'post',
    body: JSON.stringify({ url: 'https://stats-guild.herokuapp.com/api/confirm' }),
    headers: { 'Content-Type': 'application/json' },
  })
}, 60 * 1000);
