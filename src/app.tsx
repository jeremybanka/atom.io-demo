import { type FC } from "preact/compat"

import { runTransaction, undo, redo } from "atom.io"
import { useIO } from "atom.io/react"

import preactLogo from "./assets/preact.svg"
import viteLogo from "./assets/vite.svg"
import "./app.css"
import { ExtraNumbers } from "./ExtraNumbers"
import { OverTheLimitWarning } from "./OverTheLimitWarning"
import {
  aCountState,
  abProductState,
  bCountState,
  resetCountsTX,
  countsTL,
} from "./store/count"

export const App: FC = () => {
  const [aCount, setACount] = useIO(aCountState)
  const [bCount, setBCount] = useIO(bCountState)
  const [countTimesTen, setCountTimesTen] = useIO(abProductState)
  const resetCounts = runTransaction(resetCountsTX)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank" rel="noreferrer">
          <img src={preactLogo} className="logo preact" alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <button onClick={resetCounts}>Reset counts</button>

      <div className="card">
        <button onClick={() => setACount((count) => count + 1)}>
          a is {aCount}
        </button>
        <button onClick={() => setBCount((count) => count + 1)}>
          b is {bCount}
        </button>
        <button onClick={() => setCountTimesTen((count) => count + 1)}>
          countTimesTen is {countTimesTen}
        </button>
        <button onClick={() => undo(countsTL)}>Undo</button>
        <button onClick={() => redo(countsTL)}>Redo</button>

        <OverTheLimitWarning />
        <ExtraNumbers />
      </div>
      <p className="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  )
}
