const express = require('express')
const app = express()
const methodOverride = require('method-override') // npm i method-override
const petsRouter = require('./routes/pets')
const servicosRouter = require('./routes/servicos')
const homeRouter = require('./routes/home')
const usuariosRouter = require('./routes/usuarios')
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
app.use(homeRouter)
app.use(usuariosRouter)

// inicilizando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando')
})