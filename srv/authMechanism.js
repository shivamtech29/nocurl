#!/usr/bin/env node

import inquirer from "inquirer";

export default async function getAuthMechanism() {
    const options = [
        { name: 'No Auth', value: 'NoAuth' },
        { name: 'Basic Auth', value: 'BasicAuth' },
        { name: 'Oauth 2.0', value: 'Oauth2.0' },
        { name: 'Existing Auth', value: 'ExistingAuth' },
    ];

    const api = await inquirer.prompt([
        {
            type: 'list',
            name: 'auth',
            message: 'Select Auth Mechanism:',
            choices: options,
        },
    ]);
    return api.auth
}
