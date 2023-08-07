import { Dispatch } from "redux";

import { Status } from "../../models";
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
    const result: Status = await response.json();
    dispatch({ type: DELETE_FAVORITES, payload: result });
  };
};

export default deleteFavorites;
