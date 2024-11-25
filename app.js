//Carregando modulos
const express = require('express');
const handlebars = require('express-handlebars')

const app = express()
const porta = 2000 

//configurar express para receber os dados do formulario
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//configurando handlebars
app.engine('handlebars', handlebars.engine({extended:true}))
app.set('view engine', 'handlebars')//definindo o handlebars como mecanismo de visualização padrão

//carregando rotas 
const artistasRouter = require('./routes/artistas')
const gravacoesRouter = require('./routes/gravacoes')

//ultilizando rotas 
app.use('/artistas',artistasRouter)
app.use('/gravacoes',gravacoesRouter)


// EXIBINDO INFORMAÇÕES NA TELA
app.get("/",(req, res)=>{
    //res.send("<h1>Tudo Funcionando</h1>")
    res.render('home')
})



//EXECUTANDO O SERVIDOR
app.listen(porta, ()=>{
    console.log("Servidor executando na porta ", porta)
})