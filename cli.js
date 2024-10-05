#! /usr/bin/env node

import init from "./index.js"
import { Command } from "commander"
import figlet from "figlet"

const program = new Command()
console.log(figlet.textSync("nocurl"))

program
    .version("1.0.0")
    .description("send any api request from terminal or shell")
    .option("-i, --init","Initialise")
    .option("-r, --request", "Send an new API request over the web")
    .option("-n, --name", "Name of the request and auth you want to execute")
    .option("-lr, --listrequest", "Select and List saved Requests")
    .option("-la, --listauth", "Select and List all saved Auth")
    .parse(process.argv);

const options = program.opts()

init(options)