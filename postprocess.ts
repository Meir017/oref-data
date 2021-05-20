import { readJSON, writeJSON } from 'https://deno.land/x/flat/mod.ts'

// The filename is the first invocation argument
const filename = Deno.args[0] // Same name as downloaded_filename

const newData = await readDataFile(filename)
const data = await readDataFile('./data.json')

const newest = data[0].datetime

data.unshift(...data.filter(item => item.datetime > newest)); 

// Pluck a specific key off
// and write it out to a different file
// Careful! any uncaught errors and the workflow will fail, committing nothing.
await writeJSON('./data.json', JSON.stringify(data))

function readDataFile(file) {
    const data = await readJSON(file)
    data.forEach(item => item.datetime = new Date(item.datetime))
    return data
}