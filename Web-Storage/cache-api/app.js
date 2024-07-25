const button = document.getElementById("fetchData");
const header = document.querySelector('header');
const image = document.querySelector('img');

button.addEventListener("click", async() => {
    //console.log(event);
    //console.log("👀 Fetch Data Clicked");
    console.count("👀 Button Clicked");
    //console.log(fetchData());
    setLoadStatus();
    const poke = await fetchPokeData({
        pokeId: randomPokeNumber()});
    showCharacterData(poke);
    console.log("✅ Finished");
});

function setLoadStatus(){
    header.textContent = 'Loading ...';
}

function randomPokeNumber(){
    return Math.floor((Math.random() * 151) + 1);
}

function showCharacterData(pokemon){
    console.log("Chamou a funcao SHOW CHARACTER " + pokemon.name);
    header.textContent = pokemon.name;
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
}

async function fetchPokeData({ pokeId }){
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
    console.log(`[fetchCharactedData] #${pokeId}`);
    const response = await fetch(endpoint);
    addToCache(endpoint, response.clone());
    const pokemon = await response.json();
    console.log(`Character name (${pokeId}): ${pokemon.name}`);
    return pokemon;
}

async function addToCache(key, response){
    const cache = await caches.open('MY-POKE-CACHE-ID');
    cache.put(key,response);
}