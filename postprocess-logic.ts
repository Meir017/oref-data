import { readJSON, writeJSON } from 'https://deno.land/x/flat/mod.ts'

interface DataItem {
    data: string;
    date: string;
    time: string;
    datetime: string | Date;
}

export async function syncData(newData: DataItem[], filename: string) {

    const data = await readDataFile(filename)

    const newest = data[0].datetime

    const before = data.length;

    data.unshift(...newData.filter(item => item.datetime > newest));

    const after = data.length;

    // Pluck a specific key off
    // and write it out to a different file
    // Careful! any uncaught errors and the workflow will fail, committing nothing.

    console.info(`updating from ${before} to ${after} items`);

    if (after > before) {
        console.info(`adding ${after - before} items`);
        await writeJSON(filename, data)
    }
}

export async function readDataFile(file: string) {
    const data: DataItem[] = await readJSON(file)
    normalizeData(data);
    return data
}

export function normalizeData(data: DataItem[]) {
    data.forEach(item => item.datetime = new Date(item.datetime))
}