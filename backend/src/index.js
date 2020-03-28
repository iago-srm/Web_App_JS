
const express = require('express');
const routes = require('./routes');

//Inicia o express e diz pra ele que os requests vem com JSON no body
const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);