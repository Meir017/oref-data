import { syncData, readDataFile } from './postprocess-logic.ts'

const filename = Deno.args[0] // Same name as downloaded_filename

const newData = await readDataFile(filename)

await syncData(newData, './data.json');