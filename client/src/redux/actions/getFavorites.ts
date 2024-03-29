import { Dispatch } from "redux";

import { GET_FAVORITES } from "../actionTypes";
import URL from "./url";

const getFavorites = (token: string) => {
  return async function (dispatch: Dispatch) {
    const response = await fetch(`${URL}/userFav`, {
      headers: { Authorization: `bearer ${token}` }
    });
    const result = await response.json();

    return dispatch({
      type: GET_FAVORITES,
      payload: result
    });
  };
};

export default getFavorites;
