import * as React from "react"

const subscribe = () => () => {}

// false during SSR and hydration, true once running on the client
export function useMounted() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
