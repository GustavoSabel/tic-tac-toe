import { BoardType } from "../Types/BoardType";
import { PlayerType } from "../Types/PlayerType";

type ResultWin = {
  status: 'win'
  winner: PlayerType
  winCells: [number, number, number]
}

type ResultTie = {
  status: 'tie'
}

type ResultNone = {
  status: 'none'
}

type Result = ResultWin | ResultTie | ResultNone

const checkWinOnCells = (board: BoardType, cellsToCheck: [number, number, number]): ResultWin | null => {
  const [firstCell, secondCell, thirdCell] = cellsToCheck
  if (board[firstCell] === board[secondCell] && board[firstCell] === board[thirdCell] && board[firstCell] !== '') {
    return {
      status: 'win',
      winner: board[firstCell] as PlayerType,
      winCells: [firstCell, secondCell, thirdCell]
    }
  }
  return null
}


export function checkWin(board: BoardType): Result {
  // Check rows
  for (let i = 0; i < 9; i += 3) {
    const resultRow = checkWinOnCells(board, [i, i + 1, i + 2])
    if (resultRow) {
      return resultRow
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    const resultColumm = checkWinOnCells(board, [i, i + 3, i + 6])
    if (resultColumm) {
      return resultColumm
    }
  }

  const resultDiagnal1 = checkWinOnCells(board, [0, 4, 8])
  if (resultDiagnal1) {
    return resultDiagnal1
  }

  const resultDiagnal2 = checkWinOnCells(board, [2, 4, 6])
  if (resultDiagnal2) {
    return resultDiagnal2
  }

  if (board.every(cell => cell !== '')) {
    return { status: 'tie' }
  }

  return {
    status: 'none'
  }
}