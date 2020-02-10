import Sequelize from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/database.sqlite'
});

sequelize.authenticate()
.then(() => {
    console.log('Database conn successful')
}).catch(err => {
    console.error(err);
    console.log("Cannot connect to database");
});