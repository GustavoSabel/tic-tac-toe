import express from 'express';
import PlayerController from '@src/controllers/player.controller';
import asyncHandler from '@src/core/utils/asyncHandler';

const router = express.Router();

router.post('/', asyncHandler(PlayerController.newPlayer));
router.get('/', asyncHandler(PlayerController.getPlayers));

export default router;
