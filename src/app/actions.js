export const SET_LOCALE = "APP_SET_LOCALE"
export const TOGGLE_SIDEBAR_PANEL_SHOW = "APP_TOGGLE_SIDEBAR_PANEL_SHOW"

export function setLocale(locale) {
  return {
    type: SET_LOCALE,
    locale,
  }
}

export function toggleSidebarPanelShow() {
  return {
    type: TOGGLE_SIDEBAR_PANEL_SHOW,
  }
}
