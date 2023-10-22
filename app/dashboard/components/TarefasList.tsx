import { ITarefa } from "@/src/types/Tarefa"
import Tarefa from "./Tarefa"

interface TarefasListProps {
    tarefas: ITarefa[]
}

const TarefasList: React.FC<TarefasListProps> = ({ tarefas }) => {
    if (!Array.isArray(tarefas)) {
        console.log(tarefas)
        return null; 
      }

  return (
    <div className="overflow-x-auto">
    <table className="table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Descrição</th>
          <th>Prazo Final</th>
          <th>Data de Inserção</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tarefas.map((tarefa) => (
            <Tarefa key={tarefa.id} tarefa={tarefa} />
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default TarefasList