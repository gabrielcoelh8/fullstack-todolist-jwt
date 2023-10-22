"use client"

import { ITarefa } from "@/src/types/Tarefa"
import React, { FormEventHandler, useState } from "react"
import { FiEdit, FiTrash } from "react-icons/fi"
import Modal from "./Modal"
import { useRouter } from "next/navigation"
import { deleteTarefa, editTarefa } from "@/src/services/api"

interface TarefaProps {
    tarefa: ITarefa
}

const Tarefa: React.FC<TarefaProps> = ({ tarefa }) => {
  const router = useRouter()
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  //campos
  const [tituloValue, setTituloValue] = useState<string>(tarefa.titulo)
  const [descricaoValue, setDescricaoValue] = useState<string>(tarefa.descricao)
  const [dateValue, setDateValue] = useState(tarefa.prazo_final.toUTCString);
  const [formattedDate, setFormattedDate] = useState(new Date);
  const [statusValue, setStatusValue] = useState<string>(tarefa.status);

  //handles
  const handleSubmitEditTarefa: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    await editTarefa({
        id: tarefa.id,
        titulo: tituloValue,
        descricao: descricaoValue,
        prazo_final: formattedDate,
        data_insercao: tarefa.data_insercao,
        status: statusValue
    })

    setOpenModalEdit(false)
    router.refresh()
  }

  const handleDeleteTarefa = async (id: string) => {
    await deleteTarefa(id)
    setOpenModalDelete(false)
    router.refresh()
  }

  return (                
    <tr key={tarefa.id}>
        <td className="w-fit">{tarefa.titulo}</td>
        <td className="w-fit">{tarefa.descricao}</td>
        <td className="w-fit">{new Date(tarefa.prazo_final).toLocaleDateString()}</td>
        <td className="w-fit">{new Date(tarefa.data_insercao).toLocaleDateString()}</td>
        <td className="w-fit">{tarefa.status}</td>
        
        <td className="flex gap-5">
          <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25} />
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                <form method='post' onSubmit={handleSubmitEditTarefa}>
                    <div className='modal-action'>

                        <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Título</span>
                        </label>

                        <input 
                        value={tituloValue}
                        onChange={(e) => setTituloValue(e.target.value)}
                        type="text" placeholder="Digite o titulo" 
                        className="input input-bordered w-full" />

                        </div>

                    </div>

                    <div className='modal-action'>

                        <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text-alt">Descrição</span>
                        </label>

                        <textarea value={descricaoValue}
                        onChange={(e) => setDescricaoValue(e.target.value)} //at event of change input element, set useState with new value
                        placeholder="Digite a descrição"
                        className="textarea textarea-bordered h-24 w-full"
                        >
                        </textarea>
                        </div>
                    </div>

                    <div className='modal-action'>
                        <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text-alt">Prazo Final</span>
                        </label>

                        <input
                            id="data"
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="DD/MM/AAAA"
                            value={dateValue}
                            onChange={(e) => setFormattedDate(new Date(e.target.value))}
                        />
                        </div>
                    </div>


                    <div className='modal-action'>
                        <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text-alt">Status</span>
                        </label>

                        <select 
                        defaultValue={statusValue} 
                        onChange={(e) => setStatusValue(e.target.value)}
                        className="select select-bordered w-full">
                        <option disabled>Status:</option>
                        <option>Em espera</option>
                        <option>Iniciado</option>
                        <option>Pausado</option>
                        <option>Concluído</option>
                        </select>

                        </div>
                    </div>

                    <button className='btn btn-secondary m-4' type="submit">Submit</button> 
                </form>

          </Modal>

          <FiTrash onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={25} />
          <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>

                <h3 className="text-lg">`Confirma apagar a tarefa '{tarefa.titulo}'?`</h3>
                <div className="modal-action">
                  <button className="btn" onClick={() => handleDeleteTarefa(tarefa.id)}>
                    Sim
                  </button>
                </div>

          </Modal>
        </td>
    </tr>
  )
}

export default Tarefa