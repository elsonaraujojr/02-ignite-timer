import { useContext } from "react";
import { CyclesContex } from "../../contexts/CyclesContex";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  const { cycles } = useContext(CyclesContex);

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>


      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>{cycle.startDate.toISOString()}</td>
                  <td>
                    <Status statusColor={cycle.finishedDate ? 'green' : cycle.interruptDate ? 'red' : 'yellow'}>
                      {cycle.finishedDate ? 'Concluído' : cycle.interruptDate ? 'Interrompido' : 'Em andamento'}
                    </Status>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>

      </HistoryList>
    </HistoryContainer>
  )
}