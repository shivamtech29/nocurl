#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { readFromFile } from '../utils/fileUtility.js'; 
export default async function listAuth() {

    const authObjson = readFromFile('./nocurl/auth.json');
    const authList = JSON.parse(authObjson);

    const options = authList.map(auth => ({
        name: auth.name,
        value: auth
    })).filter(auth => auth.name);

    const api = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedAuth',
            message: 'Select Existing Auth:',
            choices: options,
        },
    ]);
    var indent = 1
    console.log(chalk.green("\nAuth"));
    const indentation = '  '.repeat(indent);

    // Loop through the object keys
    for (const [key, value] of Object.entries(api.selectedAuth)) {
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

    return api.selectedAuth;
}
