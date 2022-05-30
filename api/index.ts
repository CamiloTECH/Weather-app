import app from "./src/app"
import { sequelize } from "./src/db"

sequelize.sync({force:true, logging:false})
.then(()=>{
  console.log("Base de datos conectada")
  app.listen(3001,()=>console.log("Escuchando en 3001"))
})
.catch((err)=>console.log(err))