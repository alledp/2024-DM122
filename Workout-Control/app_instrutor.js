import getWorkoutDatabase from './helpers/database.js';

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

    const db = await getWorkoutDatabase();
    await db.workout.add(obj).then((result) => (console.log('DataSaved!',result)));

    console.log("Salvou Ihuul");

    db.close();

    console.log("Fechou o DB");
});