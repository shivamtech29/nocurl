#!/usr/bin/env node

import inquirer from "inquirer";
import { readFromFile } from '../utils/fileUtility.js'; 
export default async function getExistingAuth() {

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

    return api.selectedAuth;
}
