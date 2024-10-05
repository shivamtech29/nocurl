#!/usr/bin/env node

import inquirer from "inquirer";

export default async function checkTosave() {
    // Ask the user if they want to save
    const { wantToSave } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'wantToSave',
            message: 'Do you want to save this request?',
            default: false,
        },
    ]);

    // If they want to save, ask for a name
    if (wantToSave) {
        const { name } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name to save:',
                validate: (input) => input.trim() ? true : 'Name cannot be empty',
            },
        ]);
        
        return {
            save: true,
            name: name.trim(), 
        };
    } else {
        return {
            save: false,
            name: null,
        };
    }
}
