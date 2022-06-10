import { Dispatch } from "redux";
export const GET_FAVORITES: string = "getFavorites",
  GET_CITY: string = "getCity",
  GET_CITY_DETAILS: string = "getCityDetails",
  ADD_FAVORITES: string = "addFavorites",
  DELETE_FAVORITES: string = "deleteFavorites",
  DELETE_CITY: string = "deleteCity",
  CHANGE_STATUS_FAV: string = "changeStatusFav",
  LOADING: string = "loading",
  GENERAL_ERROR: string = "generalError",
  CLEAR_CITY_DETAIL: string = "clearCityDetail",
  SING_IN: string = "singIn",
  SING_UP: string = "singUp",
  CLEAR_USER: string = "clearUser",
  VALIDATION_EMAIL: string = "validationEmail",
  CHANGE_PASSWORD: string = "changePassword",
  UPDATE_STATUS:string= "updateStatus",
  LOAD_CITIES_LOCALSTORAGE:string="loadCitysLocalstorage",
  CLEAR_CITYS:string="clearCitys"

const URL = process.env.REACT_APP_URL || "http://localhost:3001";
interface Info {
  ciudad: string;
}
export const getFavorites = (token: string) => {
  return async function (dispatch: Dispatch) {
    dispatch({ type: LOADING, payload: { status: true, component: "home" } });
    const response = await fetch(`${URL}/userFav`, {
      headers: { Authorization: `bearer ${token}` },
    });
    const result: [] = await response.json();

    dispatch({ type: LOADING, payload: { status: false, component: "home" } });
    return dispatch({
      type: GET_FAVORITES,
      payload: result,
    });
  };
};

export const getCity = (name: string, token: string, updateStatus:boolean) => {
  return async (dispatch: Dispatch) => {
    if(!updateStatus) dispatch({ type: LOADING, payload: { status: true, component: "search" } });
    const response = await fetch(`${URL}/city/${name.toLocaleLowerCase()}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    const result: any = await response.json();

    if(!updateStatus) dispatch({ type: LOADING, payload: { status: false, component: "search" } });
    return result.id
      ? dispatch({ type: updateStatus?UPDATE_STATUS:GET_CITY, payload: result })
      : dispatch(changeGeneralError("notFound"));
  };
};

export const getCityDetails = (lat: string, lon: string, token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOADING, payload: { status: true, component: "detail" } });
    const response = await fetch(`${URL}/details?lat=${lat}&lon=${lon}`, {
      headers: { Authorization: `bearer ${token}` },
    });
    const result: any = await response.json();

    result.lat
      ? dispatch({ type: GET_CITY_DETAILS, payload: result })
      : dispatch(changeGeneralError("notFound"));
    dispatch({
      type: LOADING,
      payload: { status: false, component: "detail" },
    });
  };
};

export const addFavorites = (info: Info, token: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/saveFavorites`, {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
      },
    });
    const result = await response.json();
    dispatch({ type: ADD_FAVORITES, payload: result });
    dispatch({ type: CHANGE_STATUS_FAV, payload: info.ciudad });
  };
};

export const deleteFavorites = (info: Info, token: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/deleteFavorites`, {
      method: "DELETE",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    const result = await response.json();
    dispatch({ type: DELETE_FAVORITES, payload: result });
    dispatch({ type: CHANGE_STATUS_FAV, payload: info.ciudad });
  };
};

export const singIn = (info: { email: string; password: string }) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOADING, payload: { status: true, component: "Login" } });
    const response = await fetch(`${URL}/loginUser`, {
      method: "POST",
      body: JSON.stringify(info),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();

    dispatch({ type: LOADING, payload: { status: false, component: "Login" } });
    return dispatch({ type: SING_IN, payload: result });
  };
};

export const singUp = (info: {
  email: string;
  password: string;
  userName: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOADING, payload: { status: true, component: "SignUp" } });
    const response = await fetch(`${URL}/registerUser`, {
      method: "POST",
      body: JSON.stringify(info),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();

    dispatch({
      type: LOADING,
      payload: { status: false, component: "SignUp" },
    });
    return dispatch({ type: SING_UP, payload: result });
  };
};

export const singInGoogle = (info: { email: string; userName: string }) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/logingoogle`, {
      method: "POST",
      body: JSON.stringify(info),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    dispatch({ type: SING_IN, payload: result });
  };
};

export const validationEmail = (email: { email: string }) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: LOADING,
      payload: { status: true, component: "validationEmail" },
    });
    const response = await fetch(`${URL}/validationEmail`, {
      method: "POST",
      body: JSON.stringify(email),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    dispatch({
      type: LOADING,
      payload: { status: false, component: "validationEmail" },
    });
    return dispatch({ type: VALIDATION_EMAIL, payload: result });
  };
};

export const changePassword = (
  password: { password: string },
  token: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: LOADING,
      payload: { status: true, component: "changePassword" },
    });
    const response = await fetch(`${URL}/changePassword/${token}`, {
      method: "PUT",
      body: JSON.stringify(password),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();

    dispatch({
      type: LOADING,
      payload: { status: false, component: "changePassword" },
    });
    return dispatch({ type: CHANGE_PASSWORD, payload: result });
  };
};

export const changeGeneralError = (status: string) => {
  return {
    type: GENERAL_ERROR,
    payload: status,
  };
};

export const deleteCity = (name: String) => {
  return {
    type: DELETE_CITY,
    payload: name,
  };
};

export const clearCityDetail = () => {
  return {
    type: CLEAR_CITY_DETAIL,
    payload: {},
  };
};

export const clearUser = () => {
  return { type: CLEAR_USER, payload: { status: null } };
};

export const loadCitysLocalstorage=(citys:[])=>{
  return {
    type:LOAD_CITIES_LOCALSTORAGE,
    payload:citys
  }
}

export const clearCitys = () =>{
  return { type: CLEAR_CITYS, payload:[] };
}