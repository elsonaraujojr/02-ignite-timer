import { HandPalm, Play } from "phosphor-react";
import * as zod from "zod";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import { HomeContainer, StartCountdownButoon, StopCountdownButoon } from "./styles";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContex } from "../../contexts/CyclesContex";

// Controlled: onClick={(event) => setTask(event.target.value)} useState

// Uncontrolled: onSubmit={handleSubmit} function

/**
 * 
 * @returns function register(name: string) {
 *  return {
 *    funcions necesária para formulários:
 *    onChange: () => void,
 *    onBlur: () => void,
 *    onFocus: () => void
 *  }
 * }
 */


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(1, 'O ciclo presisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo presisa ser de no máximo 60 minutos.'),
})


export function Home() {
  const {
    activeCycle,
    creatNewCycle,
    interruptCurrrentCycle
  } = useContext(CyclesContex)

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const { handleSubmit, watch, /* reset */ } = newCycleForm;
  const task = watch('task')
  const isSubmitDisabled = !task


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(creatNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButoon onClick={interruptCurrrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButoon>
        ) : (
          <StartCountdownButoon disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButoon>
        )
        }
      </form>
    </HomeContainer>
  )
}