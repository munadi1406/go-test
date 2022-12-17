import  express  from "express";
import db from "./config/database.js";
import router from "./routes/index.js";
import cors from 'cors';





const app  = express();



try {
    await db.authenticate();
    console.log("database terkoneksi");
    db.sync();
} catch (error) {
    console.warn(error);
    console.log({msg:'database down'});
}


app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);




app.listen(5000,()=>{
    console.log("server jalan di port 5000");
})