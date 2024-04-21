let pokemonRepository = (function () {
//Array list
let pokemonList = [
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
    if (typeof pokemon === 'object') {
        pokemonList.push(pokemon);
    }
}
function getAll() {
    return pokemonList;

}
return {
    add: add,
    getAll: getAll
}
}());
// add a new object(pokemon) to the pokemonList
pokemonRepository.add({
    name: 'Milotic',
    height: 20,
    types: ['water']
});
//For loop
// for (let i=0; i<pokemonList.length; i++) {
//   document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
//    if (pokemonList[i].height > 5) {
//        document.write('- Whoa, that\'s huge!');
//    }
//    document.write('<br>');
//}
//For each loop
//pokemonList.forEach(function(pokemon) {
//    document.write(pokemon.name);
//});
// print the list of names from pokemonList and coresponding height of that name
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + ' (height: ' + pokemon.height + ') ');
    if (pokemon.height > 5) {
        document.write('- Whoa, that\'s huge!');
    }
    document.write('<br>');
});