import { syncData, normalizeData } from './postprocess-logic.ts'

const url = Deno.args[0]

const newData = await fetch(url).then(r => r.json());

console.info(`got ${newData.length} items`);

normalizeData(newData);

await syncData(newData, './data.json');