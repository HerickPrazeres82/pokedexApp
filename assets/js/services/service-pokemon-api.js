//Fecth é uma requisição get assincrona, ela após a requisição devolve uma promisse.
//Para acessar o resultado utiliza-se o THEN com um arrow function, primeiramente deve-se transformar para um json utilizando a função .json()
//Na sequencia pode capturar cada retorno utilizando o THEN para não precisar fazer função dentro de função e a leitura não ficar dificil

//Objeto que recebera cada pokemon
const pokeApi = {};

function convertPokeApiDetailToPokemonClass(pokemonDetail) {
    const pokemon = new Pokemon();
    pokemon.id = pokemonDetail.id;
    pokemon.nome = pokemonDetail.name;

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;

    return pokemon;
}


pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemonClass)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const urlApi = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

   //Nesse momento está apena fazendo o request para a urlApi retornando uma lista de pokemons
   //return fetch(urlApi)
   //     .then((response) => {
   //         return response.json() //Pego o response e deserializa para JSON
   //     })
   //     .then((jsonBody) => {
   //         return jsonBody.results //Pego o retorno do objeto de response para dentro da variavel jsonBody e acesso a lista (results) do objeto
   //     })
   //     .catch((error) => {
   //         console.error(error);
   //     })


    //A partir de agora além de requisitar a lista de pokemons, vamos fazer novas requisições individuais para retornar o detalhes de cada pokemon
    return fetch(urlApi)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
        .then((detailRequest) => Promise.all(detailRequest)) //Promise all espera todoas as requisições carregarem
        .then((pokemonDetails) => pokemonDetails)
}





    
    
