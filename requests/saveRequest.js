import {readFromFile , writeToFile} from '../utils/fileUtility.js'

export default function saveRequest(authObject, requestObject){
    const authObjson = readFromFile('./nocurl/auth.json')
    const authObj = JSON.parse(authObjson);
    const authObjFinal = Array.isArray(authObject) ? authObject.concat(authObj) : [authObject, ...authObj];
    const authObjectJSON = JSON.stringify(authObjFinal);
    writeToFile(authObjectJSON, './nocurl/auth.json')

    const reqObjson = readFromFile('./nocurl/requests.json')
    const reqObj = JSON.parse(reqObjson);
    const reqObjFinal = requestObject.concat(reqObj)
    const requestObjectJSON = JSON.stringify(reqObjFinal);
    writeToFile(requestObjectJSON, './nocurl/requests.json')
}