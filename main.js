const fs = require("fs/promises");
const nbt = require("prismarine-nbt");

const SINGLE_DAY_VALUE = 24000;

const executionIntervalSeconds = 60;
const sourceLevelDatFilePath =
  "/home/ymdarake/.minecraft/saves/新規ワールド/level.dat";
const destinationFilePath = "./day.txt";

async function main(sourceLevelDatFilePath, destinationFilePath) {
  while (true) {
    const buffer = await fs.readFile(sourceLevelDatFilePath);
    const { parsed } = await nbt.parse(buffer);
    const dayTime = parsed.value.Data.value.DayTime.value[1];
    const currentDayCount = Math.floor(dayTime / SINGLE_DAY_VALUE);
    await fs.writeFile(
      destinationFilePath,
      `DAY ${currentDayCount.toString()}`
    );
    await new Promise((resolve) => {
      setTimeout(resolve, executionIntervalSeconds * 1000);
    });
  }
}

main(sourceLevelDatFilePath, destinationFilePath);
