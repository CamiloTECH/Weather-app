import { Dispatch } from "redux";

import { DELETE_FAVORITES } from "../actionTypes";
import URL from "./url";

const deleteFavorites = (ciudad: string, token: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/deleteFavorites`, {
      method: "DELETE",
      body: JSON.stringify({ ciudad }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      }
    });
    const result = await response.json();
    return dispatch({ type: DELETE_FAVORITES, payload: result });
  };
};

export default deleteFavorites;
