import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"

import {Provider} from "react-redux"
import store from "store"

import Greeter from "Greeter"
import "./index.less"

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
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

