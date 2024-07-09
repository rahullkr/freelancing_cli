const dayjs = require("dayjs");

//plugins

var localizedFormat = require("dayjs/plugin/localizedFormat");
var duration = require("dayjs/plugin/duration");


function getCurrentTime() {
  dayjs.extend(localizedFormat);
  return dayjs().format("LLLL");
}

function calculateTotalTime(startTime, endTime) {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  const val =  dayjs.duration(end.diff(start));
  return val;
}


dayjs.extend(duration);
module.exports = { getCurrentTime, calculateTotalTime };
