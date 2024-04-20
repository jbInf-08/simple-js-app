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
]
//For loop
for (let i=0; i<pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
    if (pokemonList[i].height > 5) {
        document.write('- Whoa, that\'s huge!');
    }
    document.write('<br>');
}