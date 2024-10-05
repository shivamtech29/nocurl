import getToken from "./token.js";
export default async function sendApiRequest(method, url, headers, body, auth, authObject) {
    if (headers['Content-Type'] == "application/json"){
        body = JSON.stringify(body)
    }
    const options = {
        method: method,
        headers: {
            ...headers
        },
        body: body
    };

    if (auth == "BasicAuth") {
        const credentials = Buffer.from(`${authObject.username}:${authObject.password}`).toString('base64')
        options.headers['Authorization'] =  `Basic ${credentials}`    
    }
    else if (auth == "Oauth2.0") {
        const token = await getToken(authObject)
        options.headers['Authorization'] = 'Bearer ' + token
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type');
        let responseData;
        if (contentType.includes('application/json')) {
            responseData = await response.json();
        } else if (contentType.includes('text/xml') || contentType.includes('application/xml')) {
            responseData = await response.text(); 
        } else {
            responseData = await response.text();
        }

        return responseData;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

