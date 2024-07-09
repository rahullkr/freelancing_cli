const { getTimeEntries } = require("../utils/saveTimeUtils");
const { calculateTotalTime } = require("../utils/time");
const chalk = require("chalk");

async function reportCommand(project, options) {
  try {
    const sinceDate = options.since ? new Date(options.since) : null;
    const timeEntries = await getTimeEntries(project, sinceDate);
    
    if (timeEntries.length === 0) {
      throw new Error(`No time entries found for project ${project}.`);
    }
    
    let initial = timeEntries[0].start_time;
    let final = timeEntries[0].stop_time;
    const totalTime = calculateTotalTime(initial, final);

    console.log(
      chalk.green(
        `Total time spent on project ${project} = ${totalTime.hours()} hours: ${totalTime.minutes()} minutes.`
      )
    );
  } catch (error) {
    console.error(chalk.red(`Error in reportCommand for ${project}: ${error.message}`));
    
    throw error;
  }
}

module.exports = { reportCommand };
