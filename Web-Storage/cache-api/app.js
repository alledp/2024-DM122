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
    console.log("Chamou a funcao SHOW CHARACTER " + pokemon.name);
    header.textContent = pokemon.name;
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
}

async function fetchPokeData({ pokeId }){
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
    console.log(`[fetchCharactedData] #${pokeId}`);
    const pokemon = (await fetchFromCache(endpoint) || (await fecthFromNetwork(endpoint)));
    return pokemon;
}

// for(let i=1; i<=152; i++){
//     fetchPokeData({pokeId: i});
// }

async function fecthFromNetwork(endpoint){
    const response = await fetch(endpoint);
    if(response.ok){
        addToCache(endpoint, response.clone());
        return response.json();
    }else{
        throw new Error(`Not Able to request: ${endpoint}`);
    }
}

async function fetchFromCache(endpoint){
    const cache = await caches.open(`${CACHE_KEY}-JSON`);
    const response = await cache.match(endpoint);
    return response && (response.json());
}

async function addToCache(key, response){
    const jsonCache = await caches.open(`${CACHE_KEY}-JSON`);
    const imagesCache = await caches.open(`${CACHE_KEY}-IMAGES`);
    jsonCache.put(key,response);
    imagesCache.add( `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${key
        .split('/')
        .pop()}.png`
    );
}