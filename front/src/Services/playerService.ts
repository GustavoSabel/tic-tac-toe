import api from "./api"

export type PlayerContract = {
  playerId: number,
  name: string,
}

const playerService = {
  async create(name: string) : Promise<PlayerContract> {
    const result = await api.post('/player', { name })
    return result.data
  }
}

export default playerService