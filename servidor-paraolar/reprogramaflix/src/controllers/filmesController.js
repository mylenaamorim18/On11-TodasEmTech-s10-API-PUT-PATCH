const { response, request } = require("express")
const filmes = require("../models/filmes.json") //chamar nosso json

const getAll = (request, response)=>{ //criar função getAll
    response.status(200).send(filmes)
}

const getById = (request, response)=>{
    const idRequerido = request.params.id
    let idFiltrado = filmes.find(filme => filme.id == idRequerido)

    if(idFiltrado == undefined || idRequerido == " "){
        response.status(404).json([{
            "mensagem":"id não existente"
        }])
    } else{
        response.status(200).json(idFiltrado)       
    }   
}

const getByTitle = (request, response)=>{
    const titulo = request.query.titulo.toLowerCase()
    const filmeFiltrado = filmes.find(filme => filme.Title.toLowerCase().includes(titulo))

    if(titulo == "" || filmeFiltrado == undefined){
        response.status(400).json([{
            "mensagem":"por favor, digite um titulo válido"
        }])
    } else {
        response.status(200).send(filmeFiltrado)
    }
}

const getByGenre = (request, response)=>{
    const generoRequisitado = request.query.genero
    let novaLista =[]
   
    filmes.forEach(filme =>{
        let generoLista = filme.Genre.split(",") 

        for(genero of generoLista){
            
            if(genero.includes(generoRequisitado)){
                console.log(filme)
                novaLista.push(filme)
            }
        }
    })

    response.status(200).send(novaLista)
}

const updateTitle = (request, response)=>{
    const id = request.params.id
    const filmeFiltrado = filmes.find(filme => filme.id == id)

    filmeFiltrado.Title = request.body.titulo
   
    response.status(200).json([{
        "mensagem": "Titulo atualizado com sucesso",
        filmeFiltrado
    }])
}

const updateAnything = (request, response)=>{
    const id = request.params.id;
    const atualizacaoBody = request.body;
    const filmeFiltrado = filmes.find(filme => filme.id == id);

    const listaChaves = Object.assign(filmeFiltrado, atualizacaoBody);

    response.status(200).json([{
        "mensagem": "Filme atualizado com sucesso",
        listaChaves
    }]);
}

const deleteFilme = (request, response)=>{
    const id = request.params.id;
    const filmeFiltrado = filmes.filter(filme => filme.id != id);

    response.status(200).json([{
        "mensagem": "Filme deletado com sucesso!",
        filmeFiltrado
    }]);
}

const replaceFilme = (request, response)=>{
    const id = request.params.id;
    const atualizacaoBody = request.body;
    const filmeFiltrado = filmes.find(filme => filme.id == id);

    const listaChaves = Object.assign(filmeFiltrado, atualizacaoBody);

    response.status(200).json([{
        "mensagem": "Filme atualizado com sucesso",
        listaChaves
    }]);
}

module.exports = { //exportando as funções
    getAll,
    getById,
    getByTitle,
    getByGenre, 
    updateTitle,
    updateAnything,
    deleteFilme,
    replaceFilme
}