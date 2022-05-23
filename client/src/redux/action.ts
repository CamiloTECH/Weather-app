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
  CLEAR_CITY_DETAIL: string = "clearCityDetail";

const URL = "http://localhost:3001";

export const getFavorites = (name: string) => {
  return async function (dispatch: Dispatch) {
    const response = await fetch(`${URL}/user/${name}`);
    const result: [] = await response.json();
    return dispatch({
      type: GET_FAVORITES,
      payload: result,
    });
  };
};

export const getCity = (name: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOADING, payload: { status: true, component: "search" } });
    const response = await fetch(`${URL}/city/${name.toLocaleLowerCase()}`);
    const result: any = await response.json();
    dispatch({
      type: LOADING,
      payload: { status: false, component: "search" },
    });
    return result.id
      ? dispatch({ type: GET_CITY, payload: result })
      : dispatch(changeGeneralError(true));
  };
};

export const getCityDetails = (lat: string, lon: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOADING, payload: { status: true, component: "detail" } });
    const response = await fetch(`${URL}/details?lat=${lat}&lon=${lon}`);
    const result: any = await response.json();

    result.lat
      ? dispatch({ type: GET_CITY_DETAILS, payload: result })
      : dispatch(changeGeneralError(true));
    dispatch({ type: LOADING, payload: { status: false, component: "detail" }});
  };
};

interface Info {
  id: number;
  ciudad: string;
}
interface Result {
  status: Boolean;
}
export const addFavorites = (info: Info) => {
  // return async (dispatch: Dispatch) => {
  //   const response = await fetch(`${URL}/saveFavorites`, {
  //     method: "POST",
  //     body: JSON.stringify(info),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   const result:Result = await response.json();
  //   dispatch({ type:ADD_FAVORITES, payload:result })
  //   dispatch({ type:CHANGE_STATUS_FAV, payload:info.ciudad})
  return changeStatusFav(info.ciudad);
  //};
};

export const deleteFavorites = (info: Info) => {
  // return async (dispatch: Dispatch) => {
  //   const response = await fetch(`${URL}/deleteFavorites`, {
  //     method: "DELETE",
  //     body: JSON.stringify(info),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   const result:Result = await response.json();
  //   dispatch({ type:DELETE_FAVORITES, payload:result })
  return changeStatusFav(info.ciudad);
  //}
};

export const changeGeneralError = (status: boolean) => {
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

const changeStatusFav = (ciudad: string) => {
  return {
    type: CHANGE_STATUS_FAV,
    payload: ciudad,
  };
};

export const clearCityDetail = () => {
  return {
    type: CLEAR_CITY_DETAIL,
    payload: {},
  };
};

//Terminar de hacer todos lo actions register y loguin
