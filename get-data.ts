import { syncData, normalizeData } from './postprocess-logic.ts'

const newData = [];
const cities = await fetch('https://www.oref.org.il//Shared/Ajax/GetDistricts.aspx?lang=he').then(r => r.json());

const labels = [...new Set(cities.map(city => city.label_he))];

const promises = labels.map(label =>
    fetch(`https://www.oref.org.il/Shared/Ajax/GetAlarmsHistory.aspx?lang=he&mode=3&city_0=${encodeURI(label)}`)
        .then(r => r.json())
        .then(items => {
            console.info(`got ${items.length} items for ${label}`);
            if (items.length) {
                newData.push(...items);
            }
        })
);

const interval = setInterval(() => console.info(`got ${newData.length} items`), 1000);
await Promise.all(promises);
clearInterval(interval);

console.info(`got ${newData.length} items`);

normalizeData(newData);

await syncData(newData, './data.json');