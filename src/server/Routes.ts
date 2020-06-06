import express from 'express';

const routes = express.Router();

routes.get('/', (req, res): any => res.send('Hello World'));

export default routes;