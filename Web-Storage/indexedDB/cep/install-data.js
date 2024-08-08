async function extractCEPsOnly(){
    const response = await fetch('./CEPs.txt');
    const textData = await response.text();
    const lines = textData.split('\n');
    const extractCEP = (line) => line.split(';')[3];
    const cepList = lines.map(extractCEP);
    //console.log(cepList);
    return cepList;
}

// console.time('Extracting CEP');
// extractCEPsOnly();
// console.timeEnd('Extracting CEP');

export async function fetchZipCodeData (zipCode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    //const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${zipCode}`);
    const data = await response.json();
    return data;
}

export function zipCodeMapper(zipCodeData){
    return {
            zipCode: zipCodeData.cep.replace("-", ""),
            uf: zipCodeData.uf || zipCodeData.state,
            location: zipCodeData.localidade || zipCodeData.city,
            publicPlace: zipCodeData.logradouro || zipCodeData.street,
            neighborhood: zipCodeData.bairro || zipCodeData.neighborhood,
            phoneCode: zipCodeData.ddd || '',
        };
}

export async function installData() {
    const cepList = await extractCEPsOnly();
    //const cepListv2 = [cepList[0], cepList[2]];
    // const cepData = await fetchCEPData(cepList[0]);
    // const cepMapped = cepFactory(cepData);
    // console.log(cepMapped);
    const promiseList = await Promise.allSettled(cepList.map(fetchZipCodeData));
    const onlyFulfilled = (result) => result.status === 'fulfilled';
    const onlyValues = (result) => result.value;
    const zipCodeListData = promiseList.filter(onlyFulfilled).map(onlyValues);
    const onlyDataWithCEP = (cepData) => !!cepData.cep;
    const zipCodeMappedList = zipCodeListData.filter(onlyDataWithCEP).map(zipCodeMapper);

    const {default: getZipCodeDatabase} = await import ('./database.js');
    const db = await getZipCodeDatabase();

    return db.zipCode.bulkPut(zipCodeMappedList);
}

async function saveToLocalDB (zipCodeData){
    const {default: getZipCodeDatabase} = await import ('./database.js');
    const db = await getZipCodeDatabase();
    db.zipCode.add(zipCodeData).then((result) => (console.log('DataSaved!',result)));
}

export async function getFromNetwork(zipCode){
    const zipCodeData = await fetchZipCodeData(zipCode);
    const zipCodeMapped = zipCodeMapper(zipCodeData);
    //console.log(zipCodeMapped);
    saveToLocalDB(zipCodeMapped);
    return zipCodeMapped;
}