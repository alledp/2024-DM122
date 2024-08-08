const linkToInstall = document.querySelector("a[href='#']");
linkToInstall.addEventListener('click', async () => {
    console.log('install data...');
    const {installData} = await import ('./install-data.js');
    alert('Will install');
});

async function getCepData(zipCode){
    const {fetchCEPData, cepFactory} = await import ('./install-data.js');
    const {default: Dexie} = await import ('https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm');
    const db = new Dexie ('zipCodeDatabase');
    db.version(2).stores({
        zipCode: '&zipCode,location',
    });
    const zipCodeData = await db.zipCode.get({ zipCode });
    return zipCodeData;
}

function fillTable(zipCodeData){
    //This is necessary because we don't have the phone number for now
    delete zipCodeData.phoneCode;
    const addToTheTable = (key) => {
        console.log(`${key}: ${zipCodeData[key]}`);
        const tdElement = document.getElementById(key);
        tdElement.textContent = zipCodeData[key];
    } 
    Object.keys(zipCodeData).forEach(addToTheTable);

}

const form = document.querySelector('form');
form.addEventListener('submit', async () => {
    //alert(form.cep.value);
    const zipCodeData = await getCepData(form.cep.value);
    fillTable(zipCodeData)
});

//const button = document.querySelector('button');

// button.addEventListener('click', async () => {
//     console.log('Install data...');
//     button.disabled = true;
//     button.setAttribute('aria-busy', true);
//     await installData();
//     button.removeAttribute('aria-busy');
// });

// button.addEventListener('click', async () => {
//     console.log('Install data...');
//     button.disabled = true;
//     button.setAttribute('aria-busy', true);
//     await installData();
//     button.removeAttribute('aria-busy');
// });

// TODO: Improve this Code.
// TODO: Fill the Table.
// TODO: If not found in the indexedDB fetch from the network and save into the table.