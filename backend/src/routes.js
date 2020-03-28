/**
 * Comando npm instala pacote, npx executa um pacote.
 * GET : RETRIEVE
 * POST : CREATE
 * PUT : UPDATE
 * DELETE : DELETE
 * 
 * Para acessar os parâmetros enviados na request, utilize o parâmetro request da callback.
 * 
 * request.query para os parâmetros que vem com ? e & (nomeados)
 *
 *  request.params para os parâmetros que vem com / (não-nomeados)
 * Os route params não são nomeados na rota, mas quando vc acessa eles com request.params, eles
 * tem o nome ali no JSON, de acordo com o nome dado na especificação da rota (app.get())
 * 
 * request.body é um JSON
 * 
 * request.headers.varName para acessar variáveis de header
 * Pode ter duas rotas que levam à mesma rota, mas com diferentes métodos
 */

 //Basic overhead
const express = require('express');
const routes = express.Router();

//Controllers
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//ONG
//Listar todas as ongs
routes.get('/ongs', OngController.listAll);
//Cadastro de uma ong
routes.post('/ongs', OngController.create );

//Incidents
//Listar todos os incidentes
routes.get('/incidents', IncidentsController.listAll);
//Cadastro de um incidente
routes.post('/incidents', IncidentsController.create);
//Deleta um incidente
routes.delete('/incidents/:id', IncidentsController.delete);

//Profile
//Obtém todos os incidentes de uma ong
routes.get('/profile', ProfileController.index);

//Session
routes.post('/session', SessionController.create);



//TOY
//página inicial
routes.get('/',(request, response) => 
    response.json({nome:'iago', idade: 26})
);

//recurso sem /
routes.get('/usuarios',(request, response) => {

    return response.json({nome:'usuario', tipo:'free'})

});

//recurso com um param de rota
routes.get('/usuarios/:id',(request, response) => {

    return response.json({nome:'usuariod', tipo:'freeId'})

});

module.exports = routes;