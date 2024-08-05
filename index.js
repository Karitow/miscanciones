const express = require('express');
const fs = require('fs');

const filePath = "repertorio.json";
const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
res.sendFile(__dirname + "/index.html")
});

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json(canciones);
});

app.post("/canciones", (req, res) => {
    console.log(req.body);
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync(filePath, "utf8"))
    canciones.push(cancion);
    fs.writeFileSync(filePath, JSON.stringify(canciones));
    res.send("Canción agregada exitosamente")
});

app.put("/canciones/:id", (req, res) =>{
    const { id } = req.params;
    const cancion = re.body;

    const canciones = JSON.parse(fs.readFileSync(filePath, "utf8"))
    const index = canciones.findIndex((song) => song.id == id);
    guitarras[index] = cancion
    fs.writeFileSync(filePath, JSON.stringify(canciones));
    res.send("Tu canción ha sido editada en el repertorio");
});

app.delete("/canciones/:id", (req, res) =>{
    const { id } = req.params;

    const canciones = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const index = canciones.findIndex((song) => song.id == id);
    if (index !== -1){
        canciones.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(canciones));
        res.send( `Canción # ${id} eliminada exitosamente`);
    } else {
        res.status(404).send(`Erro no se encontró tu canción con ID ${id}`);
    }
});

app.listen(PORT, console.log(`Servidor conectado, http://localhost:${PORT}`))

