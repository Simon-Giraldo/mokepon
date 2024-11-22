const express = require("express") 
// inbocar libreria express js 
const app = express()
// almacena app que representa nuestro server 
app.get("/", (req, res) =>{
    res.send("Hola")
} )
// respuesta a la peticion delusuario 
app.listen(8080, () =>{
    console.log("server activo")
})
// escucha depeticiones y constacia de server activo 