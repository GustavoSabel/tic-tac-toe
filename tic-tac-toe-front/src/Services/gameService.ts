import { BoardType } from "../Types/BoardType";
import { GameStatusType } from "../Types/GameStatusType";
import { NonePlayerType } from "../Types/NonePlayerType";
import { PlayerType } from "../Types/PlayerType";
import api from "./api"

export type NewGameContract = {
  gameId: number
  board: BoardType
  match: number
  nextPlayer: PlayerType
}

type NewGameArgs = {
  playerOId: number
  playerXId: number
};

type PlateTokenArgs = {
  player: PlayerType
  row: number
  col: number
};

type PlaceNewTokenResponse = {
  namePayerO: string
  namePlayerX: string
  nextPlayer: PlayerType
  victory: BoardType | null
  match: number
  board: BoardType
  boardBeauty: string[]
  winners: PlayerType[]
  matchWinner: PlayerType | null
  finalWinner: PlayerType | NonePlayerType
  status: GameStatusType
}

const gameService = {
  async newGame(args: NewGameArgs) : Promise<NewGameContract> {
    const result = await api.post('/game', args)
    return result.data
  },

  async placeToken(gameId: number, args: PlateTokenArgs) : Promise<PlaceNewTokenResponse> {
    const result = await api.post(`/game/${gameId}/placeToken`, args)
    return result.data
  }
}

export default gameService