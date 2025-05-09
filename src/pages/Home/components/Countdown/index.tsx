import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CyclesContex } from "../../../../contexts/CyclesContex";
import { CountdownContainer, Separator } from "./styles";

// interface CountdownProps {
//   activeCycle: any;
// }

export function Countdown(
  // { activeCycle }: CountdownProps
) {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed
  } = useContext(CyclesContex)

  const totalSeconds = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0;
  const currentSeconds = activeCycle
    ? totalSeconds - amountSecondsPassed
    : 0;

  const minutesAmount = Math.floor(currentSeconds / 60) // Math(floor, round, ceil)
  const secondsAmount = currentSeconds % 60 // operador de resto

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number;



    if (activeCycle) {
      interval = setInterval(() => {

        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(
            secondsDifference
          )
        }


      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}