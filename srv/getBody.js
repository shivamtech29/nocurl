#!/usr/bin/env node

import inquirer from "inquirer";

export default async function getBody() {
    const response = await inquirer.prompt([
        {
            type: 'editor',
            name: 'body',
            message: 'Enter the request body (JSON, XML, or plain text):',
            validate: function (text) {
                if (text.trim() === '') {
                    return true; // Body can be empty if the user doesn't need one
                }
                try {
                    // If it's JSON, we try to parse it
                    JSON.parse(text);
                    return true;
                } catch (e) {
                    // If not valid JSON, just accept it as plain text or XML
                    return true;
                }
            }
        }
    ]);
    return response.body;
}