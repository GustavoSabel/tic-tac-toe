import { Request, Response, Router } from 'express';
import GameRoute from './game.route';
import PlayerRoute from './player.route';

const routes = Router();

routes.get('/', (_req: Request, res: Response) => {
  res.send({ title: 'Hello World! 👋' });
});

routes.use('/game', GameRoute);
routes.use('/player', PlayerRoute);

export default routes;
