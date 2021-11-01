const fs = require('fs')

const usuarioController = {
    index: (req, res) => {
        const content = fs.readFileSync("../usuarios.json", "utf8") // o que fazemos nessa linha?
        const usuarios = JSON.parse(content) // por que fazermos isso?
        return res.json(usuarios);
    }
}

module.exports = usuarioController