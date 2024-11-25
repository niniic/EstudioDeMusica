const express = require('express')
const router = express.Router() //modulo que ira trabalhar com as rotas

const artistas = require('../models/artistas')
const gravacoes = require('../models/gravacoes')
const {where} = require('sequelize')

//criando rotas
//1ª rota inserir dados na tabela

router.post('/inserir', async (req, res) => {
    const resultado = await gravacoes.create({
        data_gravacao: req.body.data_gravacao,
        duracao: req.body.duracao,
        artistaId: req.body.artistaId//esse campo é a chave estrangeira
    })

    if(resultado){
        res.redirect('/')
    }
    else{
        res.json({erro:"Não foi possivel cadastrar"})
    }
})

//2ª rota mostrar pagina raiz
router.get('/base', (req, res) => {
    res.render('gravacoes/index')
})

//3ª rota - consultar os dados da tabela
router.get('/', async(req,res) => {
    let resultado = await gravacoes.findAll({include:{
        model: artistas,
        as: 'artista',
        attributes: ['nome'],

    }

    
})
console.log("Dados retornados da consulta:", resultado); // Adicione esse console.log

    if(resultado){
        console.log(resultado)
        res.render('gravacoes/index',{dados:resultado})
    }
    else{
        console.log("Não foi possivel consultar os dados")
    }
})

//4ª rota - deletar os dados da tabela por id
router.get('/deletar/:id', async (req, res) => {
    const resultado = await gravacoes.destroy({
        where:{
            id:req.params.id//estamos recebendo o id via parâmetro, que está sendo passado na rota, no caso é o :id que estamos recebendo.
        }
    })
    res.redirect('/gravacoes')
})

//5ª rota - exibir o formulario de cadastro
router.get("/criar",async(req,res)=>{
    let resultado = await artistas.findAll()
    if(resultado){
        console.log(resultado)
        res.render('gravacoes/addGravacoes',{dados:resultado})
    }
    else{
        console.log("Não foi possivel exibir os dados")
        res.redirect('/')
    }    
})
module.exports = router