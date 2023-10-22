import { ITarefa } from "../types/Tarefa";

const baseUrl = 'http://localhost:4000';

export const getAllTarefas = async (): Promise<ITarefa[]> => {
    const res = await fetch(`${baseUrl}/`, {cache: 'no-store', credentials: 'include'})
    const tarefas = await res.json();
    return tarefas;
}

export const addTarefa = async (todo: ITarefa): Promise<ITarefa> => {
    const res = await fetch(`${baseUrl}/novo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            titulo: todo.titulo,
            descricao: todo.descricao,
            prazo_final: todo.prazo_final,
            data_insercao: todo.data_insercao,
            status: todo.status
        })
    });

    const newTarefa = await res.json();
    return newTarefa;
}

export const editTarefa = async (todo: ITarefa): Promise<ITarefa> => {
    const res = await fetch(`${baseUrl}/editar/${todo.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(todo)
    });

    const updatedTarefa = await res.json();
    return updatedTarefa;
}

export const deleteTarefa = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/apagar/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    })
}