import express from 'express';
import GameController from '@src/controllers/game.controller';

const router = express.Router();

router.post('/:gameId/placeToken', GameController.placeToken);
router.post('/new', GameController.newGame);

export default router;
