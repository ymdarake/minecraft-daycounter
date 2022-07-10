const fs = require("fs/promises");
const nbt = require("prismarine-nbt");

const SINGLE_DAY_VALUE = 24000;
const sourceLevelDatFilePath =
  "/home/ymdarake/.minecraft/saves/新規ワールド/level.dat";
const destinationFilePath = "./day.txt";

async function main(file) {
  const buffer = await fs.readFile(file);
  const { parsed, type } = await nbt.parse(buffer);
  const dayTime = parsed.value.Data.value.DayTime.value[1];
  const currentDayCount = Math.floor(dayTime / SINGLE_DAY_VALUE);
  await fs.writeFile(destinationFilePath, `DAY ${currentDayCount.toString()}`);
}

main(sourceLevelDatFilePath, destinationFilePath);
