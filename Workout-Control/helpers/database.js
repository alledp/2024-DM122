export default async function getWorkoutDatabase(){
    const {default: Dexie} = await import ('https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm');
    const db = new Dexie('workoutDatabase');
    db.version(2).stores({
         workout: '++id,grupoMuscular',
    });
    return db;
}