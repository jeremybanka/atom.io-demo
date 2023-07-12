import {
  atom,
  atomFamily,
  selector,
  setLogLevel,
  timeline,
  transaction,
} from "atom.io"
import { nanoid } from "nanoid"

setLogLevel(`info`)

export const aCountState = atom<number>({
  key: `aCount`,
  default: 0,
})
export const bCountState = atom<number>({
  key: `bCount`,
  default: 0,
})
export const abProductState = selector<number>({
  key: `abProduct`,
  get: ({ get }) => get(aCountState) * get(bCountState),
  set: ({ get, set }, newValue) => set(aCountState, newValue / get(bCountState)),
})

export const resetCountsTX = transaction<() => void>({
  key: `resetCounts`,
  do: ({ set }) => {
    set(aCountState, 0)
    set(bCountState, 0)
  },
})

export const findExtraNumbersState = atomFamily<number, string>({
  key: `extraNumbers`,
  default: 0,
})
export const extraNumbersIndex = atom<Set<string>>({
  key: `extraNumbersIndex`,
  default: new Set(),
})

export const addExtraNumberTX = transaction<(n: number) => string>({
  key: `addExtraNumber`,
  do: ({ set }, number) => {
    const id = nanoid()
    set(findExtraNumbersState(id), number)
    set(extraNumbersIndex, (current) => new Set([...current, id]))
    return id
  },
})

export const countsTL = timeline({
  key: `counts a & b`,
  atoms: [aCountState, bCountState, findExtraNumbersState, extraNumbersIndex],
})
