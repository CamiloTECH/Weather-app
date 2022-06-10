import {
  GET_FAVORITES,
  GET_CITY,
  GET_CITY_DETAILS,
  ADD_FAVORITES,
  DELETE_FAVORITES,
  DELETE_CITY,
  CHANGE_STATUS_FAV,
  LOADING,
  GENERAL_ERROR,
  CLEAR_CITY_DETAIL,
  SING_IN,
  SING_UP,
  CLEAR_USER,
  VALIDATION_EMAIL,
  CHANGE_PASSWORD,
  UPDATE_STATUS,
  LOAD_CITIES_LOCALSTORAGE,
  CLEAR_CITYS,
} from "./action";

interface State {
  citys: [];
  cityDetail: {};
  statusFavorites: {};
  statusLogin: {
    status: boolean | undefined;
    token?: string;
    message?: string;
  };
  statusRegister: { status: boolean | undefined };
  statusChangePassword: { status: boolean | undefined; message?: string };
  loading: { status: boolean; component: string };
  generalError: string;
}
interface actionTypes {
  type: string;
  payload: any;
}

const inicialState: State = {
  citys: [],
  cityDetail: {},
  statusFavorites: {},
  statusLogin: { status: undefined },
  statusRegister: { status: undefined },
  statusChangePassword: { status: undefined },
  loading: { status: false, component: "" },
  generalError: "",
};

function rootReducer(state: State = inicialState, action: actionTypes) {
  switch (action.type) {
    case LOAD_CITIES_LOCALSTORAGE:
      return {
        ...state,
        citys: action.payload,
      };
    case GET_FAVORITES:
      window.localStorage.setItem("citys", JSON.stringify(action.payload));
      return {
        ...state,
        citys: action.payload,
      };

    case GET_CITY:
      const existCity = state.citys.find(
        (city: any) => city.id === action.payload.id
      );
      if (existCity) {
        return {
          ...state,
          generalError: "exist",
        };
      } else {
        window.localStorage.setItem(
          "citys",
          JSON.stringify([action.payload, ...state.citys])
        );
        return {
          ...state,
          citys: [action.payload, ...state.citys],
        };
      }

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
      window.localStorage.setItem("citys", JSON.stringify(newCitys));
      return {
        ...state,
        citys: [...newCitys],
      };

    case CHANGE_STATUS_FAV:
      const newCitysFav = state.citys.map((city: any) => {
        if (city.name === action.payload) city.fav = !city.fav;
        return city;
      });
      window.localStorage.setItem("citys", JSON.stringify(newCitysFav));
      return {
        ...state,
        citys: [...newCitysFav],
      };

    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case GENERAL_ERROR:
      return {
        ...state,
        generalError: action.payload,
      };

    case CLEAR_CITY_DETAIL:
      return {
        ...state,
        cityDetail: action.payload,
      };

    case SING_IN:
      return {
        ...state,
        statusLogin: action.payload,
      };

    case SING_UP:
      return {
        ...state,
        statusRegister: action.payload,
      };

    case CLEAR_USER:
      return {
        ...state,
        statusLogin: action.payload,
        statusRegister: action.payload,
        statusChangePassword: action.payload,
      };

    case CHANGE_PASSWORD:
    case VALIDATION_EMAIL:
      return {
        ...state,
        statusChangePassword: action.payload,
      };

    case UPDATE_STATUS:
      const updateCitys = state.citys.map((city: any) => {
        if (city.name === action.payload.name) {
          action.payload.fav = city.fav;
          return action.payload;
        } else return city;
      });
      window.localStorage.setItem("citys", JSON.stringify(updateCitys));
      return {
        ...state,
        citys: [...updateCitys],
      };

    case CLEAR_CITYS:
      return {
        ...state,
        citys: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
