import getMethod from './srv/getMethod.js';
import getUrl from './srv/getUrl.js';
import getHeaders from './srv/getHeaders.js';
import getBody from './srv/getBody.js';
import getAuthMechanism from './srv/authMechanism.js';
import getBasicAuth from './srv/basicAuth.js'
import getOAuth2 from './srv/oauth.js';
import sendApiRequest from './requests/sendRequest.js';
import initNocurl from './init.js'
import saveRequest from './requests/saveRequest.js';
import checkTosave from './utils/checkToSave.js';
import getExistingAuth from './srv/eAuth.js';
import executeRequest from './requests/executeRequest.js';
import listAuth from './print/listAuth.js';
import listRequest from './print/listRequest.js';

export default async function init(options) {
    var method
    var url
    var headers
    var body
    var authMechanism
    var basicAuth = {}
    var oauth = {}
    var eAuth = {}
    var authObject = {}
    if (options.init) {
        initNocurl()
    }
    if (options.name) {
        body = await getBody()
        executeRequest(options.name)
    }
    if (options.listrequest) {
        listRequest()
    }
    if (options.listauth) {
        listAuth()
    }
    if (options.request) {
        method = await getMethod()
        console.log(method)
        url = await getUrl()
        console.log(url)
        headers = await getHeaders()
        console.log(headers)
        if (method != "GET") {
            body = await getBody()
            console.log(body)
        }
        authMechanism = await getAuthMechanism()
        console.log(authMechanism);
        if (authMechanism == "BasicAuth") {
            basicAuth = await getBasicAuth()
            console.log(authMechanism);
        }
        if (authMechanism == "Oauth2.0") {
            oauth = await getOAuth2()
            console.log(authMechanism);
        }
        if (authMechanism == "ExistingAuth") {
            eAuth = await getExistingAuth()
            console.log(authMechanism);
            authMechanism = eAuth.authMechanism
        }
        if (Object.keys(basicAuth).length !== 0) {
            authObject = basicAuth
        }
        if (Object.keys(oauth).length !== 0) {
            authObject = oauth
        }
        if (Object.keys(eAuth).length !== 0) {
            authObject = eAuth
        }

        await sendApiRequest(method, url, headers, body, authMechanism, authObject)
        .then(response => {
            console.log('Response:', response);
        })
        .catch(error => {
            console.error('Request failed:', error);
        });

        var save = await checkTosave()
        if (save.save) {
            const requestObject = [{
                "name": save.name,
                "method": method,
                "url": url,
                "headers": {
                    ...headers
                },
                "body": body,
                "authMechanism": authMechanism
            }]
            authObject["name"] = save.name
            authObject["authMechanism"] = authMechanism
            
            saveRequest([authObject], requestObject)
        }
        
    }
}
