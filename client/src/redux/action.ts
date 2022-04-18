import { Dispatch } from "redux";
export const GET_FAVORITES = "getFavorites",
  GET_CITY = "getCity", GET_CITY_DETAILS = "getCityDetails";

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

//Terminar de hacer todos lo actions, y comenzar a hacer los componentes
