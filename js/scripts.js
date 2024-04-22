var pokemonRepository = (function () {
    //Array list
    let repository = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
function add(pokemon) {
    if (typeof pokemon === 'object' &&
    'name' in pokemon &&
    'height' in pokemon &&
    'types' in pokemon
) {
        repository.push(pokemon);
    } else {
        console.log('pokemon is not correct');
    
    }
}
function getAll() {
    return repository;

}



function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.addEventListener('click', function(event) {
        showDetails(pokemon);
    });
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    
}

function showDetails(pokemon) {
    console.log(pokemon);
}

return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
};
})();
// add a new object(pokemon) to the pokemonList
console.log(pokemonRepository.getAll());
// print the list of names from pokemonList and coresponding height of that name
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);

});