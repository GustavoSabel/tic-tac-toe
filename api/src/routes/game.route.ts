import express from 'express';
import GameController from '../controllers/game.controller';

const router = express.Router();

router.get('/:gameId', GameController.gameStatus);
router.post('/:gameId/placeToken', GameController.placeToken);
router.post('/new', GameController.newGame);

export default router;
