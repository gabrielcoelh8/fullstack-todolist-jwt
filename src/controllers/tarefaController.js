const ModelTarefa = require('../models/tarefa')

module.exports =
{

    async listar(req, res) {
        try {
            const tarefas = await ModelTarefa.findAll()
            return res.status(200).json(tarefas)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async novo(req, res) {
        const { titulo, descricao, prazo_final, data_de_insercao, status } = req.body

        if (!titulo) {
            res.status(422).json({ error: "Campos obrigatorios!" })
            return
        }

        const tarefa = {
            titulo,
            descricao,
            prazo_final,
            data_de_insercao: new Date(),
            status
        }

        try {
            await ModelTarefa.create(tarefa)
            return res.status(201).json(tarefa)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async editar(req, res) {
        const _id = req.params.id
        const { titulo, descricao, prazo_final, status } = req.body

        const tarefaUpdate = {
            titulo,
            descricao,
            prazo_final,
            status
        }

        try {
            const _tarefaUpdate = await ModelTarefa.update(
                {
                    titulo: tarefaUpdate.titulo,
                    descricao: tarefaUpdate.descricao,
                    prazo_final: tarefaUpdate.prazo_final,
                    status: tarefaUpdate.status
                },
                {
                    where: {
                        id: _id
                    }
                }
            )

            if (_tarefaUpdate[0] === 0) {
                res.status(422).json({ message: 'Tarefa não encontrada.' })
                return
            }

            return res.status(200).json(tarefaUpdate)

        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async buscar(req, res) {
        const _id = req.params.id
        try {
            const tarefa = await ModelTarefa.findByPk(_id)

            if (!tarefa) {
                res.status(422).json({ message: 'Tarefa não encontrada!' })
                return
            }

            return res.status(200).json(tarefa)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },

    async apagar(req, res) {
        const _id = req.params.id
        try {
            const tarefa = await ModelTarefa.findByPk(_id)

            await tarefa.destroy()

            return res.status(200).json(tarefa)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}