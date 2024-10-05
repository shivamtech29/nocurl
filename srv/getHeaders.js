#!/usr/bin/env node

import inquirer from "inquirer";

export default async function getHeaders() {
    let headers = {};
    let addMore = true;

    while (addMore) {
        const { key, value } = await inquirer.prompt([
            {
                type: 'input',
                name: 'key',
                message: 'Enter header key (leave empty to stop):',
                validate: function (input) {
                    if (input.trim() === '') {
                        return true; // Stop adding headers if key is empty
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'value',
                message: 'Enter header value:',
                when: function (answers) {
                    return answers.key.trim() !== '';
                },
                validate: function (input) {
                    if (input.trim() === '') {
                        return 'Value cannot be empty';
                    }
                    return true;
                }
            }
        ]);

        if (!key.trim()) {
            addMore = false;
        } else {
            headers[key] = value;
            console.log(`Added header: ${key}: ${value}`);
        }
    }

    return headers;
}