const bcrypt = require('bcrypt');
const fs = require('fs')
const { validationResult } = require('express-validator');

const homeController = {
    index: (req, res) => {
        return res.render('home/index')
    },
    getContatos: (req, res) => {
        return res.render('home/contato')
    },
    postContato: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        return res.json(req.body);
    },
    getCadastro: (req, res) => res.render('home/cadastro'),

    postCadastro: (req, res) => {

        const errors = validationResult(req);
        const { nome, email, senha } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let content = fs.readFileSync("../db.json", "utf8") // leitura do arquivo
        const db = JSON.parse(content) // converter o arquivo em objeto
        const hash = bcrypt.hashSync(senha, 10);

        db.usuarios.push({ nome, email, senha: hash })

        content = JSON.stringify(db)
        fs.writeFileSync("usuarios.json", content, "utf8")
        return res.json(hash)
    },
    getLogin: (req, res) => res.render('home/login'),
    postLogin: (req, res) => {
        const content = fs.readFileSync("./db.json", "utf8")
        const db = JSON.parse(content)
        const { email, senha } = req.body

        const usuario = db.usuarios.find(usuario => usuario.email == email)

        if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
            return res.status(400).json({ mensagem: "Email ou senha estão incorretos ou não existem!" });
        }


        req.session.usuario = usuario

        res.redirect('/servicos')
    },
    servico: (req, res) => {
        let content = fs.readFileSync("./db.json", "utf8")
        const db = JSON.parse(content)
        
        res.render('home/servicos', {servicos: db.servicos})
    },
    sobre: (req, res) => res.render('home/sobre')
}

module.exports = homeController