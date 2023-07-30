import { actionTypes, ReducerState } from "../models";
import {
  ADD_FAVORITES,
  CHANGE_PASSWORD,
  CHANGE_STATUS_FAV,
  CLEAR_CITY_DETAIL,
  CLEAR_CITYS,
  CLEAR_USER,
  DELETE_CITY,
  DELETE_FAVORITES,
  GET_CITY,
  GET_CITY_DETAILS,
  GET_FAVORITES,
  LOAD_CITIES_LOCALSTORAGE,
  SING_IN,
  SING_UP,
  UPDATE_STATUS,
  VALIDATION_EMAIL
} from "./actionTypes";

const inicialState: ReducerState = {
  citys: [],
  cityDetail: undefined,
  statusFavorites: { status: false },
  statusLogin: { status: undefined },
  statusRegister: { status: undefined },
  statusChangePassword: { status: undefined }
};

function rootReducer(state: ReducerState = inicialState, action: actionTypes) {
  switch (action.type) {
    case LOAD_CITIES_LOCALSTORAGE: {
      return {
        ...state,
        citys: action.payload
      };
    }
    case GET_FAVORITES: {
      window.localStorage.setItem("citys", JSON.stringify(action.payload));
      return {
        ...state,
        citys: action.payload
      };
    }

    case GET_CITY: {
      if (action.payload?.id) {
        window.localStorage.setItem(
          "citys",
          JSON.stringify([action.payload, ...state.citys])
        );
        return {
          ...state,
          citys: [action.payload, ...state.citys]
        };
      }
      return state;
    }
    case GET_CITY_DETAILS: {
      return {
        ...state,
        cityDetail: action.payload
      };
    }

    case ADD_FAVORITES:
    case DELETE_FAVORITES:
      return {
        ...state,
        statusFavorites: action.payload
      };

    case DELETE_CITY: {
      const newCitys = state.citys.filter(city => city.name !== action.payload);
      window.localStorage.setItem("citys", JSON.stringify(newCitys));
      return {
        ...state,
        citys: [...newCitys]
      };
    }
    case CHANGE_STATUS_FAV: {
      const newCitysFav = state.citys.map(city => {
        if (city.name === action.payload) city.fav = !city.fav;
        return city;
      });
      window.localStorage.setItem("citys", JSON.stringify(newCitysFav));
      return {
        ...state,
        citys: [...newCitysFav]
      };
    }

    case CLEAR_CITY_DETAIL: {
      return {
        ...state,
        cityDetail: action.payload
      };
    }

    case SING_IN: {
      return {
        ...state,
        statusLogin: action.payload
      };
    }

    case SING_UP: {
      return {
        ...state,
        statusRegister: action.payload
      };
    }
    case CLEAR_USER: {
      return {
        ...state,
        statusLogin: action.payload,
        statusRegister: action.payload,
        statusChangePassword: action.payload
      };
    }

    case CHANGE_PASSWORD:
    case VALIDATION_EMAIL:
      return {
        ...state,
        statusChangePassword: action.payload
      };

    case UPDATE_STATUS: {
      const updateCitys = state.citys.map(city => {
        if (city.name === action.payload.name) {
          action.payload.fav = city.fav;
          return action.payload;
        } else {
          return city;
        }
      });

      window.localStorage.setItem("citys", JSON.stringify(updateCitys));
      return {
        ...state,
        citys: [...updateCitys]
      };
    }
    case CLEAR_CITYS: {
      return {
        ...state,
        citys: action.payload
      };
    }
    default:
      return state;
  }
}

export default rootReducer;
