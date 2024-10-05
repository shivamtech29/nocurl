#!/usr/bin/env node

import inquirer from "inquirer";

export default async function getMethod() {
    const options = [
        { name: 'Get', value: 'GET' },
        { name: 'Post', value: 'POST' },
        { name: 'Put', value: 'PUT' },
        { name: 'Patch', value: 'PATCH' },
        { name: 'Delete', value: 'DELETE' },
    ];

    const api = await inquirer.prompt([
        {
            type: 'list',
            name: 'method',
            message: 'Select api method:',
            choices: options,
        },
    ]);
    return api.method
}
