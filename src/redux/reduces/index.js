export default function reducer(state = [], action) {
  switch (action.type) {
    case "CLICK_CHECK_BOX":
      return { ...state, show: action.uuid }
    case "DELETE_ITEM":
      return { ...state, delete: action.uuid }
    default: return { ...state }
  }
}
