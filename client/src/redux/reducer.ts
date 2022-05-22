import {
  GET_FAVORITES,
  GET_CITY,
  GET_CITY_DETAILS,
  ADD_FAVORITES,
  DELETE_FAVORITES,
  DELETE_CITY,
  CHANGE_STATUS_FAV,
  CHANGE_GENERAL_STATUS
} from "./action";

interface State {
  citys: [];
  cityDetail: {};
  user: {};
  statusFavorites: {};
  statusLogin: {};
  generalStatus: boolean;
}
interface actionTypes {
  type: string;
  payload: any;
}

const inicialState: State = {
  citys: [],
  cityDetail: {},
  user: {},
  statusFavorites: {},
  statusLogin: {},
  generalStatus: false,
};

function rootReducer(state: State = inicialState, action: actionTypes) {
  switch (action.type) {
    case GET_FAVORITES:
      return {
        ...state,
        citys: action.payload,
      };

    case GET_CITY:
      const existCity = state.citys.find(
        (city: any) => city.id === action.payload.id
      );
      return existCity
        ? state
        : {
            ...state,
            citys: [action.payload, ...state.citys],
            generalStatus: false,
          };

    case GET_CITY_DETAILS:
      return {
        ...state,
        cityDetail: action.payload,
      };

    case ADD_FAVORITES:
    case DELETE_FAVORITES:
      return {
        ...state,
        statusFavorites: action.payload,
      };

    case DELETE_CITY:
      const newCitys = state.citys.filter(
        (city: any) => city.name !== action.payload
      );
      return {
        ...state,
        citys: [...newCitys],
      };

    case CHANGE_STATUS_FAV:
      const newCitysFav = state.citys.map((city: any) => {
        if (city.name === action.payload) city.fav = !city.fav;
        return city;
      });
      return {
        ...state,
        citys: [...newCitysFav],
      };
    
    case CHANGE_GENERAL_STATUS:
      return{
        ...state,
        generalStatus:action.payload
      }
    default:
      return state;
  }
}

export default rootReducer;
