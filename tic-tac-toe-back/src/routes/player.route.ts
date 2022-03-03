import express from 'express';
import PlayerController from '../controllers/player.controller';

const router = express.Router();

router.post('/', PlayerController.newPlayer);
router.get('/', PlayerController.getPlayers);

export default router;
