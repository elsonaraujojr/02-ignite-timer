import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separator } from "./styles";
import { Form } from "react-router-dom";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <div>
            <label htmlFor="task">Vou trabalhar em</label>
            <input type="text" id="task" />

            <label htmlFor="minutesAmount">durante</label>
            <input type="number" id="minutesAmount" />
          </div>

          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
          </CountdownContainer>

          <button type="submit">
            <Play size={24} />
            Começar
          </button>
      </form>
    </HomeContainer>
  )
}