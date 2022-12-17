import { Sequelize } from "sequelize";


const db = new Sequelize('elearning_rest','munadi1406','munadi1406!',{
    host : "db4free.net",
    dialect : "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
})



export default db;