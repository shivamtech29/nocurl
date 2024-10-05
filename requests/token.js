export default async function getToken(authObject) {
    const clientID = authObject['clientID']
    const clientSecret = authObject['clientSecret']
    const authUrl = authObject['authurl']

    const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString('base64')
    const authHeader = {Authorization: `Basic ${credentials}`}
    const response = await fetch(authUrl, {method: 'GET', headers: authHeader})
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData.access_token
}