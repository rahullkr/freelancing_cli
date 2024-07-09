const { stopTimeEntry } = require("../utils/saveTimeUtils");
const chalk = require('chalk');
const { getCurrentTime } = require("../utils/time");

async function stopCommand(project) {
  try {
    const stopTime = getCurrentTime();
    await stopTimeEntry(project, stopTime);
    console.log(chalk.green(`Stopped tracking time for ${project} at ${stopTime}`));
  } catch (error) {
    console.error(chalk.red(`Error stopping time tracking for ${project}: ${error.message}`));
    
    throw error;
  }
}

module.exports = { stopCommand };
