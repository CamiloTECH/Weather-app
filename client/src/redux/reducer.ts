import { actionTypes, ReducerState } from "../models";
import {
  CHANGE_PASSWORD,
  CHANGE_STATUS_FAV,
  CLEAR_CITY_DETAIL,
  CLEAR_CITYS,
  CLEAR_USER,
  DELETE_CITY,
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
      if (action.payload?.error) {
        return state;
      } else {
        window.localStorage.setItem("citys", JSON.stringify(action.payload));
        return {
          ...state,
          citys: action.payload
        };
      }
    }

    case GET_CITY: {
      if (action.payload?.id) {
        const existCity = state.citys.find(({ id }) => {
          return action.payload.id === id;
        });
        if (existCity) {
          return state;
        }
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
      if (action.payload?.error) {
        return state;
      } else {
        return {
          ...state,
          cityDetail: action.payload
        };
      }
    }

    case DELETE_CITY: {
      const newCitys = state.citys.filter(({ id }) => id !== action.payload);
      window.localStorage.setItem("citys", JSON.stringify(newCitys));
      return {
        ...state,
        citys: newCitys
      };
    }

    case CHANGE_STATUS_FAV: {
      const newCitysFav = state.citys.map(city => {
        if (city.id === action.payload) {
          city.fav = !city.fav;
        }
        return city;
      });
      window.localStorage.setItem("citys", JSON.stringify(newCitysFav));
      return {
        ...state,
        citys: newCitysFav
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
      if (action.payload?.id) {
        const updateCitys = state.citys.map(city => {
          if (city.id === action.payload.id) {
            action.payload.fav = city.fav;
            return action.payload;
          } else {
            return city;
          }
        });
        window.localStorage.setItem("citys", JSON.stringify(updateCitys));
        return {
          ...state,
          citys: updateCitys
        };
      } else {
        return state;
      }
    }
    case CLEAR_CITYS: {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("citys");
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
