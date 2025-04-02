import { createContext, useContext, useState } from "react";

const CyclesContext = createContext({} as any)

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)
  return (<h1>
    New Cycle Form: {activeCycle}

    <button
      onClick={() => {
        setActiveCycle(2)
      }}>
      Alterar ciclo ativo
    </button>
  </h1>)
}

function Countdown() {
  const { activeCycle } = useContext(CyclesContext)

  return <h1>Coutdown: {activeCycle}</h1>

}

export function ExemploContext() {
  const [activeCycle, setActiveCycle] = useState(0)

  return (
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <NewCycleForm />
        <Countdown />
      </div>
    </CyclesContext.Provider>
  )
}