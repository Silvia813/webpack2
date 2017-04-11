import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"

import Greeter from "./Greeter"
import "./index.less"

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Greeter />
    </AppContainer>,
    document.getElementById("root")
  )
}

render(Greeter)

if (module.hot) {
  module.hot.accept("./Greeter", () => {
    render(Greeter)
  })
}

