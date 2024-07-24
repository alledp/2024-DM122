const button = document.getElementById("fetchData");

button.addEventListener("click", (event) => {
    //console.log(event);
    //console.log("👀 Fetch Data Clicked");
    console.count("👀 Button Clicked");
    console.log(fetchData());
    console.log("🤔 Wait, Was I called first ?");

});


async function fetchData(){

    const endpoint = 'https://swapi.dev/api/people/1';
    const response = await fetch(endpoint);
    const character = await response.json();
    console.log(character);
}