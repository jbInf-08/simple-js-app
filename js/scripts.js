var pokemonRepository = (function () {
    //Array list
    let repository = [
    { 
        name: 'Bulbasaur', 
        height: 7, 
        types: ['grass', 'poison'] 
    },
    {
        name: 'Pidgey', 
        height: 1,
        types: ['flying', 'normal'] 
    },
    {
        name: 'Crobat',
        height: 5,
        types: ['flying', 'poison']
    }
];
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
pokemonRepository.add({
    name: 'Milotic',
    height: 20,
    types: ['water']
});
console.log(pokemonRepository.getAll());
// print the list of names from pokemonList and coresponding height of that name
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);

});