"use client"

import { getAllTarefas } from "@/src/services/api";
import AddTarefa from './components/AddTarefa';
import TarefasList from './components/TarefasList';
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGenerationStore } from "@/src/contexts/states";
import { ITarefa } from "@/src/types/Tarefa";



export default function Dashboard() {
  const { isAuth, setIsAuth } = useGenerationStore()
  const [tasks, setTasks] = useState<ITarefa[]>([]);

    useEffect(() => {
      const fetchTarefas = async () => {
        try {
          const tarefas = await getAllTarefas(); // Aguarde a resolução da Promise
          setTasks(tarefas);
        } catch (error) {
          console.error('Erro ao buscar tarefas:', error);
        }
      };
  
      fetchTarefas(); // Carregue as tarefas iniciais
  
      const pollingInterval = 1000; // A cada 1 segundos
      const intervalId = setInterval(fetchTarefas, pollingInterval);
  
      return () => {
        clearInterval(intervalId); // Limpe o intervalo quando o componente for desmontado
      };
    }, []);

    const router = useRouter();
  
    // Verifique a autenticação
    if (!isAuth) {
      // Redirecione o usuário de volta para a página de login
      router.push('/');
      return
      // Ou exiba uma mensagem de erro, caso deseje
    }

    return (
      <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
          <Navbar />
          <AddTarefa />
        </div>
        <TarefasList tarefas={tasks} />
      </main>
    )
}