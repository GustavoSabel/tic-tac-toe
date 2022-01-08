import express, {Request, Response} from 'express';
import GameRoute from './game.route';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send({title: 'Hello World! 👋'});
});

router.use('/game', GameRoute);

module.exports = router;
