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
        button.innerText = pokemon.name;
        button.classList.add('button-class');
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
        modalTitle.innerText = pokemon.name;
        modalBody.innerHTML = `
            <p>Name: ${pokemon.name}</p>
            <p>Height: ${pokemon.height}</p>
            <img src="${pokemon.imageUrl}" alt="${pokemon.name}">
            <!-- Add more details here if needed -->
        `;
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
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    let container = document.querySelector('.pokemon-list');
    let startX = null;
    let currentX = null;

    // Replace pointer events with mouse events
container.addEventListener('mousedown', function(event) {
    startX = event.clientX;
});

container.addEventListener('mousemove', function(event) {
    if (startX !== null) {
        currentX = event.clientX;
    }
});

container.addEventListener('mouseup', function(event) {
    if (startX !== null && currentX !== null) {
        let deltaX = currentX - startX;
        if (deltaX > 0) {
            // Swiped right, navigate to the previous item
            showPreviousPokemon();
        } else if (deltaX < 0) {
            // Swiped left, navigate to the next item
            showNextPokemon();
        }
        startX = null;
        currentX = null;
    }
});

// Add touch events for mobile support
container.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
});

container.addEventListener('touchmove', function(event) {
    if (startX !== null) {
        currentX = event.touches[0].clientX;
    }
});

container.addEventListener('touchend', function(event) {
    if (startX !== null && currentX !== null) {
        let deltaX = currentX - startX;
        if (deltaX > 0) {
            // Swiped right, navigate to the previous item
            showPreviousPokemon();
        } else if (deltaX < 0) {
            // Swiped left, navigate to the next item
            showNextPokemon();
        }
        startX = null;
        currentX = null;
    }
});

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
    pokemonRepository.getAll().forEach(function (pokemon, index) {
        pokemonRepository.addListItem(pokemon);
        if (index === 0) {
            pokemonRepository.showDetails(pokemon);
        }
    });
});