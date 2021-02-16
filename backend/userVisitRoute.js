const express = require("express");
const router = express.Router();
const app=express();
const servicoAgendamento = require("./services/ServicoAgendamento");


router.post('/cadastro', async (req,res)=>{  
    let response = await servicoAgendamento.Create(
    req.body.name, 
    req.body.address,
    req.body.description,
    req.body.date,
    req.body.time,
    req.body.age, 
    req.body.email           
)
/*
var name = req.params.name;
var address = req.params.adress;
var description = req.params.description;
var date = req.params.date;
var time = req.params.time;
var age = req.params.age;
var email = req.params.email;      
*/       
if(response) {
     res.send(response);
}else{
      res.send(JSON.stringify('error'));        
}              
});

module.exports = router;