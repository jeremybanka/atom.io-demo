import type { FC } from "preact/compat"

import { runTransaction } from "atom.io"
import { useIO, useO } from "atom.io/react"

import {
  findExtraNumbersState,
  extraNumbersIndex,
  addExtraNumberTX,
} from "./store/count"

const ExtraNumber: FC<{ id: string }> = ({ id }) => {
  const [extraNumber, setExtraNumber] = useIO(findExtraNumbersState(id))
  return (
    <>
      <button onClick={() => setExtraNumber((count) => count + 1)}>
        Extra Number {extraNumber}
      </button>
    </>
  )
}

export const ExtraNumbers: FC = () => {
  const addExtraNumber = runTransaction(addExtraNumberTX)
  const extraNumberIds = useO(extraNumbersIndex)
  return (
    <>
      <h2>Extra Numbers</h2>
      <button onClick={() => addExtraNumber(1)}>Add Extra Number</button>
      {[...extraNumberIds].map((id) => (
        <ExtraNumber id={id} key={id} />
      ))}
    </>
  )
}
