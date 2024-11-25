const {sequelizeDb, sequelizeConfig} = require('./database')

const artistas = sequelizeConfig.define(
    'artistas',
    {
        nome:{
            type:sequelizeDb.STRING,
            allowNull: false
        },
        genero:{
            type:sequelizeDb.TEXT,
            allowNull: false
        },
        preco:{
            type:sequelizeDb.DECIMAL(10,2),
            allowNull: false
        },
        descricao:{
            type:sequelizeDb.TEXT,
            allowNull: false
        }
    }
)
artistas.sync()
module.exports = artistas