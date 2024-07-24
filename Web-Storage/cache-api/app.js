const button = document.getElementById("fetchData");

button.addEventListener("click", (event) => {
    //console.log(event);
    //console.log("👀 Fetch Data Clicked");
    console.count("👀 Button Clicked");
    //console.log(fetchData());
    fetchCharacterData({charId: 1});
    fetchCharacterData({charId: 2});
    fetchCharacterData({charId: 3});
    fetchCharacterData({charId: 4});
    fetchCharacterData({charId: 5});
    fetchCharacterData({charId: 6});
    console.log("✅ Finished");

});


async function fetchCharacterData({ charId }){

    const endpoint = `https://swapi.dev/api/people/${charId}`;
    console.log(`[fetchCharactedData] #${charId}`);
    const response = await fetch(endpoint);
    const character = await response.json();
    console.log(`Character name (${charId}): ${character.name}`);
    //console.log(character);
}