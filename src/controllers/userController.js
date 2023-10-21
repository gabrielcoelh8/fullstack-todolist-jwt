const ModelUser = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports =
{
    async registro(req, res) {
        const { user_name, password, confirmPassword } = req.body

        if (!user_name) {
            return res.status(422).json({ message: "O campo user_name é obrigatório." })
        }

        if (!password) {
            return res.status(422).json({ message: "O campo password é obrigatório." })
        }

        if (password !== confirmPassword) {
            return res.status(422).json({ message: "As senhas precisam ser iguais." })
        }

        const userExists = await ModelUser.findOne({ where: { user_name: user_name } })
        if (userExists !== null) {
            return res.status(422).json({ message: "Esse user_name já está em uso." })
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        const user = {
            user_name,
            password: passwordHash
        }

        try {
            await ModelUser.create(user)
            res.status(200).json({ message: "User salvo com sucesso." })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erro interno no servidor." })
        }
    },

    async entrar(req, res) {
        const { user_name, password } = req.body

        if (!user_name) {
            return res.status(422).json({ message: "O campo user_name é obrigatório." })
        }

        if (!password) {
            return res.status(422).json({ message: "O campo password é obrigatório" })
        }

        const user = await ModelUser.findOne({ where: { user_name: user_name } })
        if (!user) {
            return res.status(404).json({ message: "Os dados de login estão incorretos!" })
        }
        const chkPassword = await bcrypt.compare(password, user.password)
        if (!chkPassword) {
            return res.status(422).json({ message: "Os dados de login estão incorretos." })
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign({
                id: user.id,
            },
                secret,
            )

            res.status(200).json({ message: "Usuário autenticado com sucesso: ", token })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erro interno no servidor." })
        }
    }
}