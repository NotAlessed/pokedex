const pokemonList = document.getElementById("pokemonList")
const pokemonDetail = document.getElementById("pokemonDetail")
const pokemonInfo = document.getElementById("pokemonInfo")
const btnBack = document.getElementById("btnBack")
const pokemonInput = document.getElementById("pokemonInput")
const searchPokemon = document.getElementById("searchPokemon")
let pokemonToSearch = ""

async function getPokemonData(idPokemon) {
    try {
        //const res = await fetch (`http://127.0.0.1:3005/api/pokemon/$(idPokemon)`)
        const res = await fetch (`https://pokeapi.co/api/v2/pokemon/$(idPokemon)`)
        const pokemon = await res.json()
        return pokemon
    } catch (error) {
        console.error(error)
        return false
    }

}
function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemon-Card")
    pokemonCard.innerHTML =`
    <img src "$(pokemon.sprites.front_default)" alt ="imagen del $ (pokemon.name)">
    <h3< $(pokemon.name)</h3>
    <p>ID: $(pokemon.id)</p>
</div>

    `
    pokemonCard.addEventListener("click",()=>showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)
    return true
}
function showPokemonDetail(pokemon){
    let typesName = []
    let typesImg = ""
    for(i-0;i<pokemon.types.length;i++){
        console.log(pokemon.types[i].type.name)
        typesImg = typesImg + `<img src="./assets/${pokemon.types[i].type.name}.png" alt="logo tipo ${pokemon.types[i].type.name}">`
        typesName.push(pokemon.types[i].type.name)
    }

    pokemonList.style.display = "none"
    pokemonDetail.style.dipslay ="block"
    pokemon.info.innerHTML =`
    <img src="${pokemon.sprites.front_default}" alt="image view front ${pokemon.name}">
    <img src="${pokemon.sprites.back_default}" alt="image view back ${pokemon.name}">
    <h3>${typesName}</h3>
    <div>${typesImg}</div>
     <div class="pokemon-register">
    <h2>Registrar estado de un Pokémon</h2>

    `
}
async function loadPokedex() {
    for(let i=1; i<=30;1++){
        let pokemon = await getPokemonData(i)
        displayPokemon(pokemon)
    }
}
btnBack.addEventListener("click",()=>{
    pokemonList.style.displayh = "grid"
    pokemonDetail.style.display = "none"
})

pokemonInput.addEventListener("input",(e)=>{
    pokemonToSearch = e.target.value
    console.log(pokemonToSearch)
})
searchPokemon.addEventListener("click",async ()=>{
    let pokemon = await getPokemonData(pokemonToSearch)
    if(pokemon==false){
        console.error("Pokemon not found")
        return alert("pokemon not found")
    }
    showPokemonDetail(pokemon)
})

