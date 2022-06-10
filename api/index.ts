import app from "./src/app"
import { sequelize } from "./src/db"

sequelize.sync({force:false, logging:false})
.then(()=>{
  console.log("Base de datos conectada")
  app.listen(process.env.PORT,()=>console.log("Escuchando en "+process.env.PORT))
})
.catch((err)=>console.log(err))