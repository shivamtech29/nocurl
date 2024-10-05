#!/usr/bin/env node

import inquirer from "inquirer";

export default async function getUrl() {
    const response = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'Enter the API URL:',
            validate: function (input) {
                if (input.trim() === '') {
                    return 'URL cannot be empty';
                }
                return true;
            }
        }
    ]);
    return response.url;
}