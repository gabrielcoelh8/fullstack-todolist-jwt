"use client"

import { ITarefa } from "@/src/types/Tarefa"
import React, { FormEventHandler, useState } from "react"
import { FiEdit, FiTrash } from "react-icons/fi"
import Modal from "./Modal"
import { useRouter } from "next/navigation"
import { deleteTarefa, editTarefa } from "@/src/services/api"
import DataField from "./DataField"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc' // Certifique-se de que o plugin 'utc' esteja instalado
dayjs.extend(utc);

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
  const [prazoValue, setPrazoValue] = useState(tarefa.prazo_final);
  const [insercaoValue, setInsercaoValue] = useState(tarefa.data_insercao);
  const [statusValue, setStatusValue] = useState<string>(tarefa.status.toString());
  

  //handles
  const handleSubmitEditTarefa: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    await editTarefa({
        id: tarefa.id,
        titulo: tituloValue,
        descricao: descricaoValue,
        prazo_final: prazoValue,
        data_insercao: insercaoValue,
        status: statusValue
    })

    setOpenModalEdit(false)
  }

  const handleDeleteTarefa = async (id: string) => {
    await deleteTarefa(id)
    setOpenModalDelete(false)
  }

  const handleDateChange = (newDate: Date) => {
    setPrazoValue(newDate);
  };

  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'Iniciado':
        return 'badge-primary';
      case 'Em espera':
        return 'badge-secondary';
      case 'Pausado':
        return 'badge-accent';
      case 'Concluído':
        return 'badge-ghost';
      default:
        return 'badge-primary';
    }
  }

  return (                
    <tr key={tarefa.id} className="hover">
        <td className="w-fit h-fit">{tarefa.titulo}</td>
        <td className="w-fit h-fit">{tarefa.descricao}</td>
        <td className="w-fit">{dayjs(tarefa.prazo_final).utc().format('DD/MM/YYYY')}</td>
        <td className="w-fit">{dayjs(tarefa.data_insercao).utc().format('DD/MM/YYYY')}</td>
        <td className="w-fit "><span className={`badge ${getBadgeClass(tarefa.status)}`}>{tarefa.status}</span></td>
        
        <td className="flex gap-5">
          <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25} />
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                <form method='PATCH' onSubmit={handleSubmitEditTarefa}>
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
                        onChange={(e) => setDescricaoValue(e.target.value)}
                        placeholder="Digite a descrição"
                        className="textarea textarea-bordered h-24 w-full"
                        >
                        </textarea>
                        </div>
                    </div>

                    <div className='modal-action'>
                        <div className="form-control w-full">
                        
                        <DataField label="Prazo Final" dateValue={tarefa.prazo_final} setSelectedDate={handleDateChange}/>

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
                        <option>Concluido</option>
                        </select>

                        </div>
                    </div>

                    <button className='btn btn-secondary m-4' type="submit">Submit</button> 
                </form>

          </Modal>

          <FiTrash onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={25} />
          <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>

                <h3 className="text-lg">Deseja mesmo apagar a tarefa {tarefa.titulo}?</h3>
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