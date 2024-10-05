#!/usr/bin/env node

import inquirer from "inquirer";

export default async function getBasicAuth() {
    let basicAuth = {};

    const { username, password } = await inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Enter username:',
            validate: function (input) {
                if (input.trim() === '') {
                    return 'Username cannot be empty';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'password',
            message: 'Enter password:',
            when: function (answers) {
                return answers.username.trim() !== '';
            },
            validate: function (input) {
                if (input.trim() === '') {
                    return 'Password cannot be empty';
                }
                return true;
            }
        }
    ]);

    basicAuth['username'] = username;
    basicAuth['password'] = password
    return basicAuth;
}