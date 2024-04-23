var pokemonRepository = (function () {
    // Array list
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let currentIndex = 0;

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name.toUpperCase(); // Capitalize Pokemon name
        button.classList.add('btn', 'btn-primary'); // Bootstrap button classes
        listItem.classList.add('list-group-item'); // Bootstrap list-group-item class
        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        // Update currentIndex before showing details
        currentIndex = pokemonList.indexOf(pokemon);
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        let modalTitle = document.querySelector('.modal-title');
        let modalBody = document.querySelector('.modal-body');
        modalTitle.innerText = pokemon.name.toUpperCase(); // Capitalize Pokemon name
        modalBody.innerHTML = `
            <p>Name: ${pokemon.name.toUpperCase()}</p> <!-- Capitalize Pokemon name -->
            <p>Height: ${pokemon.height}</p>
            <p>Ability: ${pokemon.ability}</p> <!-- Add ability -->
            <p>Type: ${pokemon.type}</p> <!-- Add type -->
            <img src="${pokemon.imageUrl}" alt="${pokemon.name}" class="img-fluid">
            <!-- Add more details here if needed -->
        `;

        // Add arrows for navigation
        let prevArrow = document.createElement('button');
        prevArrow.innerHTML = '&lt;';
        prevArrow.classList.add('prev-arrow');
        modalBody.appendChild(prevArrow);
        prevArrow.addEventListener('click', function() {
            showPreviousPokemon();
        });

        let nextArrow = document.createElement('button');
        nextArrow.innerHTML = '&gt;';
        nextArrow.classList.add('next-arrow');
        modalBody.appendChild(nextArrow);
        nextArrow.addEventListener('click', function() {
            showNextPokemon();
        });

        $('#bootstrapModal').modal('show');
    }

    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                    addListItem(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.ability = details.abilities[0].ability.name; // Get first ability
                // Get types
                item.types = details.types.map(type => type.type.name);
                item.type = item.types.join(', '); // Join multiple types with comma if more than one
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    function showPreviousPokemon() {
        if (currentIndex > 0) {
            currentIndex--;
            showDetails(pokemonList[currentIndex]);
        }
    }

    function showNextPokemon() {
        if (currentIndex < pokemonList.length - 1) {
            currentIndex++;
            showDetails(pokemonList[currentIndex]);
        }
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});