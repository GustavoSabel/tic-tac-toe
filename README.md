# TIC TAC TOE
This is a tic-tac-toe API

## APIs
### Create New Player
- Resource: POST `/player/new`
- Request:
  ```json
  {
    "name": "",
  }
  ```
- Response
    - 200 - `{"playerId": "", "name": ""}`.
    - 400 - Request is invalid.

### Create New Game
- Resource: POST `/game/new`
- Request:
  ```json
  {
    "player1Id": 0,
    "player2Id": 0,
  }
  ```
- Response
    - 200 - `{"gameId": ""}`.
    - 400 - Request is invalid.

### Place Token
- Resource: POST `/game/{gameId}/placeToken`
- Request
  ```json
  {
    "player": 0, // 1 or 2. This is the number of player, not the id 
    "row": 0, // 0, 1 or 2
    "column": 0 // 0, 1 or 2
  }
  ```
- Response
    - 200 - Success
    ```json
  {
      "gameId": 1,
      "message": "Player Gustavo placed a token in row 3 and col 3",
      "player1": "Gustavo",
      "player2": "Nury",
      "board": [
          "_ _ 1",
          "_ 1 2",
          "_ _ 1"
      ], // Return in this format to be easier to view
      "winners": ["1", "1", "2"] // Players that already win one match
  }  
  ```
    - 400 - Request is invalid or no game exist for gameId.

## How to execute 
### Run locally
1. Run the command `npm install` to install the dependencies
1. Create a **".env"** file. You can copy the file **".env.local.machine"** and rename it to **".env"**
1. Run the command `npm run start`

### Run on docker
Just the command `npm start docker-compose-up`
