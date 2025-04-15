import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionTypes, Cycle, cyclesReducer } from "../reducers/cycles";

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
  }
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId
      }
    })
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

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle
      }
    })
    setAmountSecondsPassed(0)
  }

  function interruptCurrrentCycle() {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId
      }
    })
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
