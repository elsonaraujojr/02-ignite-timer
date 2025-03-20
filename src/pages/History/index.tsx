import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
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
            <tr>
              <td>Tarefa 000</td>
              <td>2 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa 001</td>
              <td>2 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa 002</td>
              <td>2 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa 003</td>
              <td>2 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa 004</td>
              <td>2 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa 005</td>
              <td>2 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="yellow">Em adamento</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa 006</td>
              <td>2 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="red">Interrompodo</Status>
              </td>
            </tr>
          </tbody>
        </table>

      </HistoryList>
    </HistoryContainer>
  )
}