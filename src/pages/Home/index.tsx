import { HandPalm, Play } from "phosphor-react";
import { createContext, useState } from "react";
import * as zod from "zod";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import { HomeContainer, StartCountdownButoon, StopCountdownButoon } from "./styles";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

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

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptDate?: Date,
  finishedDate?: Date,
}

interface CyclesContexType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
  amountSecondsPassed: number,
  setSecondsPassed: (seconds: number) => void,
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(1, 'O ciclo presisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo presisa ser de no máximo 60 minutos.'),
})

export const CyclesContex = createContext({} as CyclesContexType);

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)


  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    setCycles((state) => state.map(cycle => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, finishedDate: new Date() }
      } else {
        return cycle
      }
    }))
  }
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)


  function handleCreatNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    reset();
  }

  function handleInterruptCycle() {
    setCycles(state =>
      state.map(cycle => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      }))
    setActiveCycleId(null);
  }



  /**
   * Prop Drilling: Quando temos MUITAS PROPRIEDADES apenas para comunicação entre propriedades;
   * Context API: Permite compartilhar informações entre VÁRIOS COMPONENTES ao mesmo tempo;
   */

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm;
  const task = watch('task')
  const isSubmitDisabled = !task

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreatNewCycle)} action="">
        <CyclesContex.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed
          }}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContex.Provider>

        {activeCycle ? (
          <StopCountdownButoon onClick={handleInterruptCycle} type="button">
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