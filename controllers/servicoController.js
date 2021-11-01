const { v4: uuid } = require('uuid');
const storage = require('../config/storage')

const uploadAvatar = storage('avatar', '/servicos')

const servicos = [
    { id: uuid(), nome: "Banho", valor: 40, avatar: "/img/gatinho.jpg" },
    { id: uuid(), nome: "Tosa", valor: 50, avatar: "/img/gatinho.jpg" },
    { id: uuid(), nome: "Pedicure", valor: 10, avatar: "/img/gatinho.jpg" },
    { id: uuid(), nome: "Denticure", valor: 130, avatar: "/img/gatinho.jpg" },
    { id: uuid(), nome: "Clínica", valor: 150, avatar: "/img/gatinho.jpg" },
]

const servicoController = {
    index: (req, res) => {
                
        const usuario = req.session.usuario;
        return res.render('servicos/lista', { servicos, usuario });
    },

    store: (req, res) => {
        return res.render('servicos/cadastro');
    },

    save: (req, res) => {
        uploadAvatar(req, res, () =>  {
            const { nome, valor } = req.body
            const avatar = '/img/servicos/' + req.file.originalname
            servicos.push({ id: uuid(), nome, valor: Number(valor), avatar})
            return res.redirect('/servicos');
        })
    },

    edit: (req, res) => {
        const { id } = req.params
        const servico = servicos.find(servico => servico.id == id);

        return res.render('servicos/edit', { servico })
    },

    update: (req, res) => {
        const { nome, valor } = req.body
        const { id } = req.params
        const servicoIndex = servicos.findIndex(servico => servico.id == id); // encontramos a posição do usuário no array

        const servicoAtualizado = {
            id,
            nome,
            valor: Number(valor)
        }

        servicos[servicoIndex] = servicoAtualizado; // atualizamos a posição do array com um usuário atualizado
        return res.redirect('/servicos');
    },

    delete: (req, res) => {
        const { id } = req.params;

        const servicoIndex = servicos.findIndex(servico => servico.id == id);

        servicos.splice(servicoIndex, 1); // removemos um item do array

        return res.redirect('/servicos');
    }
}


module.exports = servicoController