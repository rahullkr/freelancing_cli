const { showTimeEntries } = require("../utils/saveTimeUtils");

async function showCommand() {
  const timeEntries = await showTimeEntries();
  console.log("Time entries:", timeEntries);
}

module.exports = { showCommand };
