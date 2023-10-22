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
  const { isAuth } = useGenerationStore()
  const [tasks, setTasks] = useState<ITarefa[]>([]);
  const router = useRouter();

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

    // Verifique a autenticação
    if (typeof window !== "undefined" && !isAuth) {
      // Redirecione o usuário de volta para a página de login
      router.push('/');
      return null; // Ou outra ação apropriada, como uma mensagem de redirecionamento em vez de renderizar o componente
    }

    return (
      <main className="max-w-4xl mx-auto mt-4 w-full">
        <div className="text-center my-5 flex flex-col gap-4">
          <Navbar />
          <AddTarefa />
        </div>
        <TarefasList tarefas={tasks} />
      </main>
    )
}