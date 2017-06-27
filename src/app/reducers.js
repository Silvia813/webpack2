import update from "immutability-helper"
import {
  SET_LOCALE,
  TOGGLE_SIDEBAR_PANEL_SHOW,
} from "app/actions"

const initialState = {
  locale: "en",
  sidebarPanelShow: false,
}

const handlers = {
  [SET_LOCALE](state, {locale}) {
  },

  [TOGGLE_SIDEBAR_PANEL_SHOW](state) {
    return update(state, {
      sidebarPanelShow: {$apply: (v) => !v}
    })
  },
}

export default function app(state=initialState, action) {
  const type = action.type
  if (!handlers[type]) return state
  return handlers[type](state, action)
}
