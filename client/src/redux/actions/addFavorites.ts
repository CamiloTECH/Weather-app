import { Dispatch } from "redux";

import { Info, Status } from "../../models";
import { ADD_FAVORITES, CHANGE_STATUS_FAV } from "../actionTypes";
import URL from "./url";

const addFavorites = (info: Info, token: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/saveFavorites`, {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      }
    });
    const result: Status = await response.json();
    dispatch({ type: ADD_FAVORITES, payload: result });
    dispatch({ type: CHANGE_STATUS_FAV, payload: info.ciudad });
  };
};

export default addFavorites;
