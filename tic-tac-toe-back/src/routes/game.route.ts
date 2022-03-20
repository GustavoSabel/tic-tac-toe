import express from 'express';
import GameController from '@src/controllers/game.controller';
import asyncHandler from '@src/core/utils/asyncHandler';

const router = express.Router();

router.post('/:gameId/placeToken', asyncHandler(GameController.placeToken));
router.post('/new', asyncHandler(GameController.newGame));

export default router;

