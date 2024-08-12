const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('form submitted');
    const obj = new Object();
    const group = document.getElementById("selectGroup");

    obj.grupoMuscular = group.options[group.selectedIndex].text;
    obj.exercicio = form.exercicio.value;
    obj.series = form.series.value;
    obj.repeticoes = form.repeticoes.value;
    obj.peso = form.peso.value;

    const {default: Dexie} = await import ('https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm');
    const db = new Dexie('workoutDatabase');
    db.version(2).stores({
         workout: '++id,grupoMuscular',
    });

    await db.workout.add(obj).then((result) => (console.log('DataSaved!',result)));

    console.log("Salvou Ihuul");

    db.close();

    console.log("Fechou o DB");
});

// const button = document.getElementById('searchButton');

// button.addEventListener('click', async (event) => {
//     const group = document.getElementById("selectGroup");
//     console.log(`BUSCAR: ${group.options[group.selectedIndex].text}`);

//     const {default: Dexie} = await import ('https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm');
//     const db = new Dexie('workoutDatabase');
//     db.version(2).stores({
//          workout: '++id,grupoMuscular',
//     });

//     await db.workout.add(obj).then((result) => (console.log('DataSaved!',result)));


// });