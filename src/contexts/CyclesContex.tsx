import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface CreateCycleData {
  task: string,
  minutesAmount: number
}

interface CyclesContexType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number,
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void,
  creatNewCycle: (data: CreateCycleData) => void,
  interruptCurrrentCycle: () => void
}

export const CyclesContex = createContext({} as CyclesContexType);

interface CyclesContextProviderProps {
  children: ReactNode
}


export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer, {
    cycles: [],
    activeCycleId: null
  },
    () => {
      const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
      return {
        cycles: [],
        activeCycleId: null
      }
    }
  )
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0;
  })



  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJson)

  }, [cyclesState])



  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function creatNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCurrrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContex.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        creatNewCycle,
        interruptCurrrentCycle
      }}>
      {children}
    </CyclesContex.Provider>
  )
}
