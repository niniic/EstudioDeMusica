const database = require("./database"); // Importando o banco de dados
const artistas = require("./artistas"); // Importando a tabela planos

//Criando a tabela de gravacoes
const gravacoes = database.sequelizeConfig.define(
  "gravacoes", //Nome da tabela
  {
    data_gravacao: {
      type: database.sequelizeDb.DATE,
      allowNull: false,
    },

    duracao: {
      type: database.sequelizeDb.INTEGER,
      allowNull: false,
    },
  }
);

//criando a chave estrangeira
// Estamos dizendo que um artista pode ter muitas gravacoes
artistas.hasMany(gravacoes, {
  foreignKey: "artistaId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

gravacoes.belongsTo(artistas, {
  foreignKey: "artistaId",
});

//// Sincronizando a tabela gravacoes com o banco de dados
gravacoes.sync();
module.exports = gravacoes;
