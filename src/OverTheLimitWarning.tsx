import type { FC } from "preact/compat"

import { selector } from "atom.io"
import { useO } from "atom.io/react"

import { abProductState } from "./store/count"

const PRODUCT_LIMIT = 10

export const productHasReachedLimitState = selector<boolean>({
  key: `productHasReachedLimit`,
  get: ({ get }) => get(abProductState) >= PRODUCT_LIMIT,
})

export const OverTheLimitWarning: FC = () => {
  const productHasReachedLimit = useO(productHasReachedLimitState)
  const product = useO(abProductState)

  return (
    <>
      {productHasReachedLimit ? (
        <div className="alert alert-warning">
          <strong>Warning!</strong> {product} is at or over the limit.
        </div>
      ) : (
        <div className="alert alert-success">
          <strong>Success!</strong> {product} is under the limit.
        </div>
      )}
    </>
  )
}
