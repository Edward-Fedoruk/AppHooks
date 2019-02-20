import React, { Suspense } from "react"
import Preloader from "./Preloader"

export default Component => props => (
  <Suspense fallback={<Preloader />}>
    <Component {...props} />
  </Suspense>
)
