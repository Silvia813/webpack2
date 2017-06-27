import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import thunkMiddleware from "redux-thunk"
import {routerReducer} from "react-router-redux"

import app from "app/reducers"

const store = createStore(
  combineReducers({
    app,
    routing: routerReducer,
  }),
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
