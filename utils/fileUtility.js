import fs from 'fs'

export function readFromFile(path){
    return fs.readFileSync(path, 'utf8');
}

export function writeToFile(tasks, path){
    fs.writeFileSync(path, tasks);
}
