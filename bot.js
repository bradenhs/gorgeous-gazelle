class Bot {
  constructor(config) {
    this.config = config;
  }

  move(board) {
    console.log(board);
    const player = this.config.player;

    const availableMoves = [];

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (board[x][y] === "empty") {
          availableMoves.push({ x, y });
        }
      }
    }

    const randomMove =
      availableMoves[Math.floor(availableMoves.length * Math.random())];

    if (!randomMove) {
      return { x: 0, y: 0 };
    }

    const winningMove = availableMoves.find(({ x, y }) => {
      board[x][y] = player;
      const result = this.hasVictory(board, player);
      board[x][y] = "empty";
      return result;
    });

    if (winningMove) {
      return winningMove;
    }

    const otherPlayer = player === "x" ? "o" : "x";
    const savingMove = availableMoves.find(({ x, y }) => {
      board[x][y] = otherPlayer;
      const result = this.hasVictory(board, otherPlayer);
      board[x][y] = "empty";
      return result;
    });

    if (savingMove) {
      return savingMove;
    }

    return randomMove;
  }

  hasVictory(board, player) {
    const topLeft = { x: 0, y: 0 };
    const topCenter = { x: 0, y: 1 };
    const topRight = { x: 0, y: 2 };

    const centerLeft = { x: 1, y: 0 };
    const centerCenter = { x: 1, y: 1 };
    const centerRight = { x: 1, y: 2 };

    const bottomLeft = { x: 2, y: 0 };
    const bottomCenter = { x: 2, y: 1 };
    const bottomRight = { x: 2, y: 2 };

    const winningLines = [
      [topLeft, topCenter, topRight],
      [centerLeft, centerCenter, centerRight],
      [bottomLeft, bottomCenter, bottomRight],

      [topLeft, centerLeft, bottomLeft],
      [topCenter, centerCenter, bottomCenter],
      [topRight, centerRight, bottomRight],

      [topLeft, centerCenter, bottomRight],
      [bottomLeft, centerCenter, topRight],
    ];

    return winningLines.some((line) =>
      line.every((position) => board[position.x][position.y] === player)
    );
  }
}

module.exports.Bot = Bot;
