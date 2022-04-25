import { Dispatch } from "redux";
export const GET_FAVORITES:string = "getFavorites",
  GET_CITY:string = "getCity",
  GET_CITY_DETAILS:string = "getCityDetails",
  ADD_FAVORITES:string = "addFavorites",
  DELETE_FAVORITES:string = "deleteFavorites"

const URL = "localhost:3001";

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
    const response = await fetch(`${URL}/city/${name.toLocaleLowerCase()}`);
    const result: {} = await response.json();
    return dispatch({
      type: GET_CITY,
      payload: result,
    });
  };
};

export const getCityDetails = (lat: number, lon: number) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/details?lat=${lat}&lon=${lon}`);
    const result: {} = await response.json();
    return dispatch({
      type: GET_CITY_DETAILS,
      payload: result,
    });
  };
};

interface Info {
  id: number;
  ciudad: string;
}
interface Result {
  status:Boolean
}
export const addFavorites = (info: Info) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/saveFavorites`, {
      method: "POST",
      body: JSON.stringify(info),
      headers: { "Content-Type": "application/json" },
    });
    const result:Result = await response.json();
    return dispatch({
      type:ADD_FAVORITES,
      payload:result
    })
  };
};

export const deleteFavorites = (info: Info) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/deleteFavorites`, {
      method: "DELETE",
      body: JSON.stringify(info),
      headers: { "Content-Type": "application/json" },
    });
    const result:Result = await response.json();
    return dispatch({
      type:DELETE_FAVORITES,
      payload:result
    })
  };
};


//Terminar de hacer todos lo actions register y loguin
