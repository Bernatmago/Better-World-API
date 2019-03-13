const express = require('express');
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
const incidenceRouter = require('./routers/incidence');
const userRouter = require('./routers/user')

const app = express();
const port = 3000;
//Leer fichero de instrucciones
//La app se inicia en http://localhost:3000/
//Definimos acciones segun el tipo de peticion

//Pasa el body automaticamente a json
app.use(bodyParser.json());
//Routers con las llamadas especificas
app.use(incidenceRouter);
app.use(userRouter);
app.get('/notas', (req, res) => res.send('Tens un 10 crack figura mamut'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));