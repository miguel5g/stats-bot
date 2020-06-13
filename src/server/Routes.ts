import express from 'express';

const routes = express.Router();

routes.get('/api/confirm', (req, res) => res.json({ message: 'Sucess', app: 'Stats-Bot' }));

export default routes;