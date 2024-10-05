#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { readFromFile } from '../utils/fileUtility.js'; 

function printObjectLines(obj, indent = 0) {

    const indentation = '  '.repeat(indent);

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            console.log(chalk.cyan(indentation + key + ":"));
            printObjectLines(value, indent + 1);
        } else {
            const coloredKey = chalk.cyan(indentation + key + ":");
            let coloredValue;

            if (typeof value === 'string') {
                coloredValue = chalk.yellow(value);
            } else if (typeof value === 'number') {
                coloredValue = chalk.green(value);
            } else if (typeof value === 'boolean') {
                coloredValue = chalk.magenta(value);
            } else {
                coloredValue = chalk.white(value);
            }

            console.log(`${coloredKey} ${coloredValue}`);
        }
    }
}

export default async function listRequest(indent=1) {

    const reqObjson = readFromFile('./nocurl/requests.json');
    const reqList = JSON.parse(reqObjson);

    const options = reqList.map(req => ({
        name: req.name,
        value: req
    })).filter(req => req.name);

    const api = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedReq',
            message: 'Select Existing Request:',
            choices: options,
        },
    ]);
    console.log(chalk.green("\nRequest"));
    printObjectLines(api.selectedReq, 1)

}
