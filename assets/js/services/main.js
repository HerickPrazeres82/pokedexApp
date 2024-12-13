
const pokemonList = document.getElementById('pokemonList');
const loadButton = document.getElementById('loadMore');
const maxRecords = 151
const limit = 10;
let offset = 0;

function convertPokemonTypesLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertPokemonToLi(pokemon) {
    return ` <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.nome}</span>

                <div class="detail">
                    <ol class="types">
                       ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}" />
                </div>                
            </li>`
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemon = []) => {
        const newHtml = pokemon.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml;
    })
}

loadButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

    loadPokemonItens(offset, limit)
})

//pokemons = [] => Garante que a lista de pokemons esteja vazia caso n�o encontre ngm na api
//pokeApi.getPokemons()
//    .then((pokemons = []) => {
//        //Pega a lista de pokemons e utiliza o MAP para converter para uma lista de LI
//        const newList = pokemons.map((value) => {
//            return convertPokemonToLi(value);
//        })

//        //Concate a list removendo a virgula, no caso dentro do m�todo join n�o tem nada
//        const newHtmlLi = newList.join("");

//        //Por fim escreve no html
//        pokemonList.innerHTML = newHtmlLi;
//    })

//Escrevendo o c�digo acima em apenas uma linha
pokeApi.getPokemons()
    .then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join("");
    })

