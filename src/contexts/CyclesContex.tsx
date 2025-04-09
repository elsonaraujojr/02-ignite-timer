import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateCycleData {
  task: string,
  minutesAmount: number
}

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptDate?: Date,
  finishedDate?: Date,
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
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    console.log('State: ', state);
    console.log('Action: ', action);

    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }
    if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
      return state.map(cycle => {
        if (cycle.id === action.payload.activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      })
    }
    if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
      return state.map(cycle => {
        if (cycle.id === action.payload.activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    }
    console.log('State after: ', state);
    console.log('Action after: ', action);

    return state;
  }, [])




  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId
      }
    })
    // setCycles((state) => state.map(cycle => {
    //   if (cycle.id === activeCycleId) {
    //     return { ...cycle, finishedDate: new Date() }
    //   } else {
    //     return cycle
    //   }
    // }))
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

    // setCycles((state) => [...state, newCycle])
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    })
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId
      }
    })
    // setCycles(state =>
    //   state.map(cycle => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }))
    setActiveCycleId(null);
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
