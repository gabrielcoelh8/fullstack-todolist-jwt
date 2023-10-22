"use client"                ///for allowing useState

import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { FormEventHandler, useState } from 'react'
import { addTarefa } from '@/src/services/api'
import DataField from './DataField'
import dayjs from 'dayjs'

const AddTarefa = () => {
    const tomorrow = dayjs().add(1, 'day');
    
    const [modalOpen, setModalOpen] = useState<boolean>(false)
 
    const [tituloValue, setTituloValue] = useState<string>('')
    const [descricaoValue, setDescricaoValue] = useState<string>('')
    const [prazoValue, setPrazoValue] = useState(tomorrow.toDate());
    const [statusValue, setStatusValue] = useState<string>('');

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        await addTarefa({
            id: '',
            titulo: tituloValue,
            descricao: descricaoValue,
            prazo_final: prazoValue,
            data_insercao: dayjs().toDate(),
            status: statusValue
        })

        //resetar formulario
        setTituloValue('')
        setDescricaoValue('')
        setPrazoValue(tomorrow.toDate())
        setStatusValue('Em espera')

        //fechar modal
        setModalOpen(false)
    }

    const handleDateChange = (newDate: Date) => {
        setPrazoValue(newDate);
    };

    return (
        <div>
            <button onClick={() => setModalOpen(true)} 
            className="btn btn-primary w-1/2">
                Nova tarefa <AiOutlinePlus className='ml-2' size={18}/>
            </button>

            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form method='post' onSubmit={handleSubmitNewTodo}>
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

                        <DataField 
                            label="Prazo Final" 
                            dateValue={prazoValue} 
                            setSelectedDate={handleDateChange}
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
                        <option>Concluido</option>
                        </select>

                        </div>
                    </div>

                    <button className='btn btn-secondary m-4' type="submit">Submit</button> 
                </form>
            </Modal>
        </div>
    )
}

export default AddTarefa

