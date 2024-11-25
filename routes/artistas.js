const express = require('express')
const router = express.Router()//modulo  que irá operar com as rotas

    const artistas = require('../models/artistas')
    const gravacoes = require('../models/gravacoes')
    const {where} = require('sequelize')

//criando rotas 
//1ª rota - inserir dados na tabela

router.post('/store',async(req,res)=>{
    const produto = await artistas.create({
        nome: req.body.nome,
        genero: req.body.genero,
        preco: req.body.preco,
        descricao: req.body.descricao
    })

    if(produto){
        res.redirect('/')
    }
    else{
        res.json({erro:"Não foi possível cadastrar"})
    }
})

//2ª rota - mostrar pagina raiz
router.get('/show',async(req,res)=>{
    res.render('artistas/index')
})

//3ª routar - consultar dados da tabela
router.get('/',async(req,res)=>{
    let produto = await artistas.findAll()
    if(produto){
        console.log(produto)
        res.render('artistas/index',{dados:produto})
    }
    else{
        res.json("Não foi possivel exibir os dados")
    }
})

//4ª rota - deletar dados da tabela por id
router.get('/destroy/:id', async(req,res)=>{
    const produto = await artistas.destroy({
        where:{
            id:req.params.id//estamos recebendo o id via parâmetro, que está sendo passado na rota, no caso é o :id que estamos recebendo.
        }
    })
    res.redirect('/artistas')
})

//5ª - exibir formulario de cadastro
router.get("/create",async(req,res)=>{
    let produto = await artistas.findAll()
    if(produto){
        console.log(produto)
        res.render('artistas/addArtistas',{dados:produto})
    }
    else{
        console.log("Não foi possivel exibir os dados")
        res.redirect('/')
    }
})
module.exports = router
