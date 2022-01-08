import express, {Request, Response} from 'express';
import GameRoute from './game.route';
import PlayerRoute from './player.route';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send({title: 'Hello World! 👋'});
});

router.use('/game', GameRoute);
router.use('/player', PlayerRoute);

module.exports = router;
