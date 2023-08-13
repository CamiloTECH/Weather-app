import { Dispatch } from "redux";

import { Status } from "../../models";
import { ADD_FAVORITES } from "../actionTypes";
import URL from "./url";

const addFavorites = (ciudad: string, token: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/saveFavorites`, {
      method: "POST",
      body: JSON.stringify({ ciudad }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      }
    });
    const result: Status = await response.json();
    return dispatch({ type: ADD_FAVORITES, payload: result });
  };
};

export default addFavorites;
