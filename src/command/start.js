const { saveTimeEntry } = require("../utils/saveTimeUtils");
const { getCurrentTime } = require("../utils/time");
const chalk = require("chalk");

async function startCommand(project) {
  try {
    const startTime = getCurrentTime();
    await saveTimeEntry(project, startTime);

    console.log(
      chalk.green(`Started tracking time for ${project} at ${startTime}`)
    );
  } catch (error) {
    console.error(
      chalk.red(`Error starting time tracking for ${project}: ${error.message}`)
    );

    throw error;
  }
}

module.exports = { startCommand };
