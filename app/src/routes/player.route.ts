import express from 'express';
import PlayerController from '../controllers/player.controller';

const router = express.Router();

router.post('/new', PlayerController.newPlayer);

export default router;
