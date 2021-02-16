const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const models=require('./models');
const app=express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 let user=models.User; 



router.get("/cadastro",(req,res) => {
    res.render("create");
})

router.post("/create", async (req,res) =>{
    var status = await ServicoAgendamento.Create(
        req.body.name, 
        req.body.address,
        req.body.description,
        req.body.date,
        req.body.time,
        req.body.age, 
        req.body.email           
    )  
    if(status) {
        res.redirect("/");
   }else{
         res.send(JSON.stringify('error'));        
   }              
   });
    
   
module.exports = router;