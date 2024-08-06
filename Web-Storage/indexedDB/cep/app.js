import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm';

async function extractCEPsOnly(){
    const response = await fetch('./CEPs.txt');
    const textData = await response.text();
    const [firstLine] = textData.split('\n');
    const [,,,cep] = firstLine.split(';');
    console.log(firstLine);
    console.log(cep);
}

console.time('Extracting CEP');
extractCEPsOnly();
console.timeEnd('Extracting CEP');

async function fetchCEPData (cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    console.log('response data: ', data);
    return data;
}

// const db = new Dexie('zipCodeDatabase');

// db.version(1).stores({
//     zipCode: '++id,cep',
// });

// db.zipCode.add({
//     zipCode: data.cep.replace("-", ""),
//     uf: data.uf,
//     location: data.localidade,
//     publicPlace: data.logradouro,
//     neighborhood: data.bairro,
//     phoneCode: data.ddd,
// });