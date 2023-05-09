const { Bot } = require("./bot");

let bot;

process.stdin.on("data", async (data) => {
  const input = data.toString();
  const command = input.slice(0, 1);
  const payload = input.slice(1);

  // "s" for "start"
  if (command === "s") {
    const standardCustomConfigSplit = payload.indexOf(".");
    const standardConfigParts = payload
      .slice(0, standardCustomConfigSplit)
      .split(",");

    const config = {
      gameTimeLimit: parseInt(standardConfigParts[0]),
      turnTimeLimit: parseInt(standardConfigParts[1]),
      player: standardConfigParts[2] === "0" ? "x" : "o",
      startingPosition: payload
        .slice(standardCustomConfigSplit + 1)
        .split("|")
        .map((row) => row.split(",")),
    };

    bot = new Bot(config);

    process.stderr.write("<<zilch:started>>");

    return;
  }

  // "m" for "move"
  if (command === "m") {
    const move = await bot.move(
      payload.split("|").map((row) => row.split(","))
    );
    process.stderr.write(`<<zilch:move${move.x},${move.y}>>`);
    return;
  }
});

process.stderr.write("<<zilch:ready>>");
      