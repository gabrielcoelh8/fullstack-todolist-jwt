import { ITarefa } from "../types/Tarefa";
const baseUrl = 'http://localhost:4000';

export const getAllTarefas = async (): Promise<ITarefa[]> => {
    try {
        const res = await fetch(`${baseUrl}/`, {
            cache: 'no-store', 
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error(`Erro na solicitação: ${res.status} - ${res.statusText}`);
        }

        const tarefas = await res.json();
        return tarefas;
    } catch (error) {
        // Tratamento de erro genérico
        console.error('Erro na solicitação:', error);
        throw error; // Propaga o erro para quem chamar essa função
    }
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

export const loginUser = async (_user_name: string, _password: string ): Promise<any> => {
    try {
        const response = await fetch("http://localhost:4000/auth/entrar", {
          headers: {
            "Content-type": "application/json",
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            user_name: _user_name,
            password: _password,
          })
        });
        const data = await response.json();

        if(response.ok) {
            return response.status
        } else {
            return data
        }

      } catch (error) {
        console.log(error);
    }
}