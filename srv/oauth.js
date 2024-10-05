#!/usr/bin/env node

import inquirer from "inquirer";

export default async function getOAuth2() {
    let oauth = {};

    const { authurl, clientID, clientSecret } = await inquirer.prompt([
        {
            type: 'input',
            name: 'authurl',
            message: 'Enter Authorization URL:',
            validate: function (input) {
                if (input.trim() === '') {
                    return 'Authorization URL cannot be empty!';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'clientID',
            message: 'Enter Client ID:',
            validate: function (input) {
                if (input.trim() === '') {
                    return 'Client ID cannot be empty!';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'clientSecret',
            message: 'Enter Client Secret:',
            validate: function (input) {
                if (input.trim() === '') {
                    return 'Client Secret cannot be empty!';
                }
                return true;
            }
        },
    ]);

    oauth["authurl"] = authurl;
    oauth["clientID"] = clientID;
    oauth["clientSecret"] = clientSecret;

    return oauth;
}
