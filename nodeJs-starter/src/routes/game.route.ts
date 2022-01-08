import express from 'express';
import GameController from '../controllers/game.controller';

/**
 * Game Routes
 *
 * @author TopherThomas
 */

const router = express.Router();

/* GET create new game. */
router.get('/:gameId', GameController.gameStatus);

/* POST create new game. */
router.post('/:gameId/placeToken', GameController.placeToken);

/* POST create new game. */
router.post('/new', GameController.newGame);

// Export Person Router.
export default router;
