import { NonePlayerType } from "./NonePlayerType";
import { PlayerType } from "./PlayerType";

type BoardPlace = (NonePlayerType | PlayerType)
export type BoardType = 
  [
    BoardPlace, BoardPlace, BoardPlace,
    BoardPlace, BoardPlace, BoardPlace,
    BoardPlace, BoardPlace, BoardPlace,
  ]