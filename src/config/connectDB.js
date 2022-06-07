const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('kethao', 'root', null,{
    host:'localhost',
    dialect:'mysql',
    logging: false
});



let connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('connection has been established sucessfully.');
    } catch (error){
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;