// const form = document.querySelector('form');

// form.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     console.log('form submitted');
//     const obj = new Object();
//     const group = document.getElementById("selectGroup");

//     obj.grupoMuscular = group.options[group.selectedIndex].text;
//     obj.exercicio = form.exercicio.value;
//     obj.series = form.series.value;
//     obj.repeticoes = form.repeticoes.value;
//     obj.peso = form.peso.value;

//     const {default: Dexie} = await import ('https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm');
//     const db = new Dexie('workoutDatabase');
//     db.version(2).stores({
//          workout: '++id,grupoMuscular',
//     });

//     await db.workout.add(obj).then((result) => (console.log('DataSaved!',result)));
// });

const button = document.getElementById('searchButton');

button.addEventListener('click', async (event) => {
    const group = document.getElementById("selectGroup");
    const grupoMuscular = group.options[group.selectedIndex].text
    console.log(`BUSCAR: ${grupoMuscular}`);

    // Find some old friends
	
    //const all = await db.workout.where('grupoMuscular').equals(grupoMuscular);
    const {default: Dexie} = await import ('https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm');
        const db = new Dexie('workoutDatabase');
        db.version(2).stores({
             workout: '++id,grupoMuscular',
        });

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
                <td>${repeticoes}</td>
                <td>${peso}</td>
                <td style="width: 30px">
                     <span style="cursor: pointer" > ✏️ </span>
                </td>
                <td style="width: 30px">
                    <span style="cursor: pointer"> 🗑️ </span>
                </td>
              </tr>`;
    return html;
}