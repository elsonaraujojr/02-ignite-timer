import { zodResolver } from "@hookform/resolvers/zod";
import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButoon, TaskInput } from "./styles";

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
    .min(5, 'O ciclo presisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo presisa ser de no máximo 60 minutos.'),
})

export function Home() {

  const { register, handleSubmit, watch, /* formState */ } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  });

  function handleCreatNewCycle(data) {
    console.log(data);


  }

  // console.log(formState.errors);


  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreatNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para seu projeto."
            list="task-suggestions"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Romã" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButoon /*disabled={!isSubmitDisabled}*/ type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButoon>
      </form>
    </HomeContainer>
  )
}