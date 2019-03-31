import React from "react"
import Placeholder from "./components/Placeholder"
import withNavigation from "./components/withNavigation"
import webhooks from "./assets/webhooks.svg"

const App = () => (
  <div className="App">
    <Placeholder 
      imgSrc={webhooks}
      title="Here will be all statistics"
    />
  </div>
)

export default withNavigation(App)
