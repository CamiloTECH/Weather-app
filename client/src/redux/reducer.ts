import {
  GET_FAVORITES,
  GET_CITY,
  GET_CITY_DETAILS,
  ADD_FAVORITES,
  DELETE_FAVORITES,
} from "./action";

interface State {
  citys: [];
  cityDetail: {};
  user: {};
  statusFavorites: {};
  statusLogin:{}
}
interface actionTypes{
  type:string,
  payload:any
}

const inicialState: State = {
  citys: [],
  cityDetail: {},
  user: {},
  statusFavorites: {},
  statusLogin:{}
}

function rootReducer(state: State = inicialState, action:actionTypes) {
  switch (action.type) {
    case GET_FAVORITES:
      return {
        ...state,
        citys:action.payload
      }
    case GET_CITY:
      return {
        ...state,
        citys: [action.payload,...state.citys]
      }
    case GET_CITY_DETAILS:
      return {
        ...state,
        cityDetail: action.payload
      }
    case ADD_FAVORITES:
    case DELETE_FAVORITES:
      return {
        ...state,
        statusFavorites:action.payload
      }
    default:
      return state
  }
}

export default rootReducer;
