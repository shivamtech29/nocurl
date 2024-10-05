import sendApiRequest from "./sendRequest.js";
import { readFromFile } from '../utils/fileUtility.js';
import getBody from "../srv/getBody.js";

export default async function executeRequest(name) {

    const requestsData = readFromFile('./nocurl/requests.json');
    const requests = JSON.parse(requestsData);

    const authData = await readFromFile('./nocurl/auth.json');
    const auths = JSON.parse(authData);

    const requestObject = requests.find(req => req.name === name);
    if (!requestObject) {
        throw new Error(`Request with name "${name}" not found.`);
    }

    const { method, url, headers, body, authMechanism } = requestObject;

    const authObject = auths.find(auth => auth.name === name && auth.authMechanism === authMechanism);
    if (!authObject) {
        throw new Error(`Authentication details for "${name}" not found.`);
    }
    var newBody = body
    if (method != "GET"){
        const { wantToChangeBody } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'wantToSave',
                message: 'Do you want to change body?',
                default: false,
            },
        ]);
        if (wantToChangeBody) {
            newBody = await getBody()
        }
    }
    

    try {
        const response = await sendApiRequest(method, url, headers, newBody, authMechanism, authObject);
        console.log('API Response:', response);
    } catch (error) {
        console.error('Error sending API request:', error);
    }
}
