const button = document.getElementById("fetchData");
const header = document.querySelector('header');
const output = document.querySelector('output');

button.addEventListener("click", async() => {
    //console.log(event);
    //console.log("👀 Fetch Data Clicked");
    console.count("👀 Button Clicked");
    //console.log(fetchData());
    setLoadStatus();
    const poke = await fetchPokeData({pokeId: 1});
    showCharacterData(poke);
    console.log("✅ Finished");
});

function setLoadStatus(){
    output.textContent = header.textContent = 'Loading ...';
}

function showCharacterData(character){
    console.log("Chamou a funcao SHOW CHARACTER " + character.name);
    header.textContent = character.name;
    output.textContent = JSON.stringify(character, null, 2);
}

async function fetchPokeData({ pokeId }){
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
    console.log(`[fetchCharactedData] #${pokeId}`);
    const response = await fetch(endpoint);
    const pokemon = await response.json();
    console.log(`Character name (${pokeId}): ${pokemon.name}`);
    return pokemon;
}