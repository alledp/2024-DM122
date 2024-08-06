import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm';

const response = await fetch(`https://viacep.com.br/ws/37537144/json/`);
const data = await response.json();
console.log('response data: ', data);

const db = new Dexie('zipCodeDatabase');
db.version(1).stores({
    zipCode: '++id,cep',
});

db.zipCode.add({
    zipCode: data.cep.replace("-", ""),
    uf: data.uf,
    location: data.localidade,
    publicPlace: data.logradouro,
    neighborhood: data.bairro,
    phoneCode: data.ddd,
});