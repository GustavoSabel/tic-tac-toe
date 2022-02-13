import api from "./api"

export type NewGameContract = {
  gameId: number,
}

type NewGameArgs = {
  player1Id: number;
  player2Id: number;
};

type PlateTokenArgs = {
  player: number;
  row: number;
  col: number;
};

const gameService = {
  async newGame(args: NewGameArgs) : Promise<NewGameContract> {
    const result = await api.post('/game/new', args)
    return result.data
  },

  async plateToken(gameId: number, args: PlateTokenArgs) : Promise<NewGameContract> {
    const result = await api.post(`/game/${gameId}/placeToken`, args)
    return result.data
  }
}

export default gameService