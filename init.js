import path from 'path';
import fs from 'fs'

function createFileDirectory(directoryPath, fileName1, fileName2, requests, auth) {
    const filePath1 = path.join(directoryPath, fileName1);
    const filePath2 = path.join(directoryPath, fileName2);

    fs.mkdir(directoryPath, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
        } else {
            const jsonData1 = JSON.stringify(requests, null, 2);

            fs.writeFile(filePath1, jsonData1, (err) => {
                if (err) {
                    console.error('Error creating JSON file:', err);
                }
            });
            const jsonData2 = JSON.stringify(auth, null, 2);

            fs.writeFile(filePath2, jsonData2, (err) => {
                if (err) {
                    console.error('Error creating JSON file:', err);
                }
            });
        }
    });
}

export default function initNocurl() {
    const requests = []
    const auth = []
    const directoryPath = 'nocurl';
    const fileName1 = 'requests.json';
    const fileName2 = 'auth.json';
    createFileDirectory(directoryPath, fileName1, fileName2, requests, auth);
}
