const Sequelize = require('sequelize');
const sequelize = new Sequelize('dados_abertos', 'root','',{
    host: "127.0.0.1",
    dialect: 'mysql',
    define:{
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
})

sequelize.autheticate().then(function(){
    console.log('Conectado no banco com sucesso!');
}).catch(function(err){
    console.log('Falha ao se conectar'+err);
})