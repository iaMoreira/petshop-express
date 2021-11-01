const express = require('express')
const app = express()
const methodOverride = require('method-override') // npm i method-override
const petsRouter = require('./routes/pets')
const servicosRouter = require('./routes/servicos')
const { check, body,  validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require('fs')
const session = require('express-session')

app.use(session({secret: 'senha segura', resave: true, saveUninitialized: true}))

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride('_method'))

// configurando ejs
app.use(express.static('public'))
app.set('view engine', 'ejs')

// configurando as rotas
app.use(petsRouter)
app.use('/servicos', servicosRouter)
app.get('/', (req, res) => {
    return res.render('index')
})


app.get('/contatos', (req, res) => {
    return res.render('contato')
})

app.post('/contatos',
    [
        body('nome').isLength({ min: 1 }),
        body('mensagem'),
        body('email'),
    ], 
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        console.log(erros)
        return res.json(req.body);

})

app.get('/cadastro', (req, res) => res.render('cadastro'))

app.post('/cadastro',  [
    check('nome').isLength({ min: 3 }),
    check('senha'),
    check('email'),
],  (req, res) => {

    const errors = validationResult(req);
    const {nome, email, senha} = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let content = fs.readFileSync("usuarios.json", "utf8") // leitura do arquivo
    const usuarios = JSON.parse(content) // converter o arquivo em objeto
    const hash = bcrypt.hashSync(senha, 10);
    
    usuarios.push({nome, email, senha: hash})
    
    content = JSON.stringify(usuarios)
    fs.writeFileSync("usuarios.json", content, "utf8")
    return res.json(hash)
})

app.get('/usuarios', (req, res) => {
    const content = fs.readFileSync("usuarios.json", "utf8") // o que fazemos nessa linha?
    const usuarios = JSON.parse(content) // por que fazermos isso?
    return res.json(usuarios);
})

app.get('/login', (req, res) => res.render('login'))

app.post('/login', (req, res) => {
    const content = fs.readFileSync("usuarios.json", "utf8")
    const usuarios = JSON.parse(content)
    const {email, senha} = req.body

    const usuario = usuarios.find(usuario => usuario.email == email)

    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
        return res.status(400).json({ mensagem: "Email ou senha estão incorretos ou não existem!" });
    }


    req.session.usuario = usuario

    res.redirect('/servicos')
})

// inicilizando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando')
})