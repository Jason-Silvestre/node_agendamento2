const express = require("express");
const cors=require('cors');
const bodyParser = require("body-parser");
const models=require('./models');
const app=express();
const connection = require("./database/database");
const mongoose = require("mongoose");
const ServicoAgendamento = require("./services/ServicoAgendamento");
const servicoAgendamento = require("./services/ServicoAgendamento");

//Database
//------------------------------------------------------------
   connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });   
mongoose.connect("mongodb://localhost:27017/agendamento",{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false);

//------------------------------------------------------------

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));//muito importante para  apresentar o calendario
app.set('view engine', 'ejs'); 
let user=models.User; 

//------------------------------------------------------------
//chamando as rotas
let userVisitRoute = require('./userVisitRoute');
app.use('/', userVisitRoute)

let pastorLoginRoute = require('./pastorLoginRoute');
app.use('/', pastorLoginRoute)

let calendarioVisitasRoute = require('./calendarioVisitasRoute');
app.use('/', calendarioVisitasRoute)

let gerenciarVisitasRoute = require('./gerenciarVisitasRoute');
app.use('/', gerenciarVisitasRoute)

let pastorAllVisitsRoute = require('./pastorAllVisitsRoute');
app.use('/', pastorAllVisitsRoute)

let criarVisitaRoute = require('./criarVisitaRoute');
app.use('/', criarVisitaRoute)

let financeiroRoute = require('./financeiroRoute');
app.use('/', financeiroRoute)

let cadastroVisitaRoute = require('./cadastroVisitaRoute');
app.use('/', cadastroVisitaRoute)

let pastorLocalizaVisitaRoute = require('./PastorLocalizaVisitaRoute');
app.use('/', pastorLocalizaVisitaRoute)

let pastorTerminaVisitaRoute = require('./PastorTerminaVisitaRoute');
app.use('/', pastorTerminaVisitaRoute)

//------------------------------------------------------------

//Essa rota é muito importante
//manter essa rota aqui mesmo para não dar bug
app.get("/event/:id",async (req, res) =>{
    var visita = await ServicoAgendamento.GetById(req.params.id);
    console.log(visita);
    res.render("event", {visit: visita});
}); 
//fim das rotas 

//------------------------------------------------------------


//notifica por email ao usuário sobre a visita
var pollTime = 5000 ;
setInterval(() => { 
     ServicoAgendamento.SendNotification();
},pollTime) 

//------------------------------------------------------------
//conectando servidor opção 1
let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor Rodando');
});

//opção 2 para se conectar ao servidor
//app.listen(3000, () => {});


