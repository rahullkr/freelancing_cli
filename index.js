#!/usr/bin/env node
const { program } = require("commander");
const { startCommand } = require("./src/command/start");
const { stopCommand } = require("./src/command/stop");
const { reportCommand } = require("./src/command/report");
const {showCommand} = require('./src/command/show')
program
  .command("start <project> ")
  .description("Start tracking time for the <project>")
  .action(startCommand);
program
  .command(" stop <project> ")
  .description("Stop tracking time for the project")
  .action(stopCommand);
program
  .command("report <project> ")
  .description("Generate a time report for the project name <project>")
  .option("--since <date>", "Filter entries on the basis of date")
  .action(reportCommand);
program
  .command("show")
  .description("It wil give the total description of the table")
  .action(showCommand);
program.parse(process.argv);
