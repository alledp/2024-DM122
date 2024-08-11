const button = document.getElementById("fetchData");
const header = document.querySelector('header');
const image = document.querySelector('img');

const CACHE_KEY = 'MY-POKE-CACHE-ID';

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
    header.textContent = pokemon.name;
    loadPokeImage(pokemon);
}

async function loadPokeImage(pokemon){
    //const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    const endpoint = pokemon.sprites.other['official-artwork'].front_default;
    const response = (await fetchFromCache(endpoint) || await fecthFromNetwork(endpoint));
    const blob = await response.blob();
    //display image from blob

    const imageUrl = URL.createObjectURL(blob);
    image.src = imageUrl;
}

async function fetchPokeData({ pokeId }){
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
    console.log(`[fetchCharactedData] #${pokeId}`);
    const response = (await fetchFromCache(endpoint) || (await fecthFromNetwork(endpoint)));
    const pokemon = await response.json();
    return pokemon;
}

for(let i=1; i<=152; i++){
    fetchPokeData({pokeId: i});
}

async function fecthFromNetwork(endpoint){
    const response = await fetch(endpoint);
    if(response.ok){
        addToCache(endpoint, response.clone());
        return response;
    }else{
        throw new Error(`Not Able to request: ${endpoint}`);
    }
}

async function fetchFromCache(endpoint){
    const cache = await caches.open(CACHE_KEY);
    const response = await cache.match(endpoint);
    return response && (response);
}

async function addToCache(key, response){
    const jsonCache = await caches.open(CACHE_KEY);
    jsonCache.put(key,response);
}