const button = document.getElementById("fetchData");
const header = document.querySelector('header');
const output = document.querySelector('output');

button.addEventListener("click", (event) => {
    //console.log(event);
    //console.log("👀 Fetch Data Clicked");
    console.count("👀 Button Clicked");
    //console.log(fetchData());
    setLoadStatus();
    const character = fetchCharacterData({charId: 1});
    showCharacterData(character);
    console.log("✅ Finished");

});

function setLoadStatus(){
    output.textContent = header.textContent = 'Loading ...';
}

function showCharacterData(character){
    header.textContent = character.name;
    output.textContent = JSON.stringify(character, null, 2);
}


async function fetchCharacterData({ charId }){

    const endpoint = `https://swapi.dev/api/people/${charId}`;
    console.log(`[fetchCharactedData] #${charId}`);
    const response = await fetch(endpoint);
    const character = await response.json();
    console.log(`Character name (${charId}): ${character.name}`);
    return character;
}