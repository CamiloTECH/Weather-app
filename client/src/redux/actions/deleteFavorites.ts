import { Dispatch } from "redux";

import { Info, Status } from "../../models";
import { CHANGE_STATUS_FAV, DELETE_FAVORITES } from "../actionTypes";
import URL from "./url";

const deleteFavorites = (info: Info, token: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/deleteFavorites`, {
      method: "DELETE",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      }
    });
    const result: Status = await response.json();
    dispatch({ type: DELETE_FAVORITES, payload: result });
    dispatch({ type: CHANGE_STATUS_FAV, payload: info.ciudad });
  };
};

export default deleteFavorites;
