"use client"                ///for allowing useState

import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { FormEventHandler, useState } from 'react'
import { addTarefa } from '@/src/services/api'
import { useRouter } from 'next/navigation'
import { format, isValid } from 'date-fns';
import { v4 as uuidv4 } from 'uuid'

const AddTarefa = () => {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const [tituloValue, setTituloValue] = useState<string>('')
    const [descricaoValue, setDescricaoValue] = useState<string>('')
    const [dateValue, setDateValue] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const [statusValue, setStatusValue] = useState<string>('Em espera');

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        await addTarefa({
            id: '',
            titulo: tituloValue,
            descricao: descricaoValue,
            prazo_final: new Date(formattedDate),
            data_insercao: new Date(),
            status: statusValue
        })

        setTituloValue("")
        setModalOpen(false)
        router.refresh()
    }

    function handleDateChange(value: string) {
        const inputValue = value;
        const parsedDate = new Date(inputValue);
    
        if (isValid(parsedDate)) {
          const formatted = format(parsedDate, 'dd/MM/yyyy');
          setFormattedDate(formatted);
        } else {
          setFormattedDate('Data inválida');
        }
    
        setDateValue(inputValue);
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
                            <span className="label-text">
                                {formattedDate}
                            </span>
                        </label>

                        <input
                            id="data"
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="DD/MM/AAAA"
                            value={dateValue}
                            onChange={(e) => handleDateChange(e.target.value)}
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
        </div>
    )
}

export default AddTarefa

