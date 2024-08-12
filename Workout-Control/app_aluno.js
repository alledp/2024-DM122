import getWorkoutDatabase from './helpers/database.js';

//console.log(await readDefault());

const button = document.getElementById('searchButton');

button.addEventListener('click', async (event) => {
    const group = document.getElementById("selectGroup");
    const grupoMuscular = group.options[group.selectedIndex].text
    console.log(`BUSCAR: ${grupoMuscular}`);

    const db = await getWorkoutDatabase();

    let allGroup = await db.workout.where("grupoMuscular").equals(grupoMuscular).toArray();

    resetTable();
    allGroup.forEach(element => {
        const valueHTML = toHTML(element);
        console.log(element);
        addToHTML(valueHTML);
    });
    
});

function resetTable(){
    const listValues = document.getElementById('listValues');
    listValues.innerHTML= '';
}

function addToHTML(allValues){
    const listValues = document.getElementById('listValues');
    listValues.insertAdjacentHTML('beforeend', allValues);
}

function toHTML(element){
    let exercicio = element.exercicio;
    let series = element.series;
    let repeticoes = element.repeticoes;
    let peso = element.peso;
    const html = `
              <tr>
                <th scope="row" >${exercicio}</th>
                <td>${series}</td>
                <td>${repeticoes}x</td>
                <td>${peso} Kg</td>
                <td style="width: 30px">
                     <span style="cursor: pointer" > ✏️ </span>
                </td>
                <td style="width: 30px">
                    <span style="cursor: pointer"> 🗑️ </span>
                </td>
              </tr>`;
    return html;
}

async function readDefault(){
    const response = await fetch('./DEFAULT.txt');
    const textData = await response.text();
    const obj = new Object();
    const lines = textData.split('\n');
    obj.grupoMuscular = (line) => line.split(';')[0];
    // obj.exercicio = (line) => line.split(';')[1];
    // obj.series = (line) => line.split(';')[2];
    // obj.repeticoes = (line) => line.split(';')[3];
    // obj.peso = (line) => line.split(';')[4];
    const dataList = lines.map(obj.grupoMuscular);
    return dataList;
}

//TODO Finish the implementation of DEFAULT.txt
//TODO Implement the Edit and Delete.
//TODO ALUNO should be able only to Edit NOT to DELETE.