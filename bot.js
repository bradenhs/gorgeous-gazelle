class Bot {
  constructor(config) {
    this.config = config;
    console.log(this.config);
  }

  move(board) {
    console.log(board);

    const availableSpots = [];

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (board[x][y] === "empty") {
          availableSpots.push({ x, y });
        }
      }
    }

    return availableSpots[Math.floor(Math.random() * availableSpots.length)];
  }
}

module.exports.Bot = Bot;
      