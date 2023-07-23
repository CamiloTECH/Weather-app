import { Dispatch } from "redux";

import { City } from "../../models";
import { GET_FAVORITES, LOADING } from "../actionTypes";
import URL from "./url";

const getFavorites = (token: string) => {
  return async function (dispatch: Dispatch) {
    dispatch({ type: LOADING, payload: { status: true, component: "home" } });
    const response = await fetch(`${URL}/userFav`, {
      headers: { Authorization: `bearer ${token}` }
    });
    const result: City[] = await response.json();

    dispatch({ type: LOADING, payload: { status: false, component: "" } });

    return dispatch({
      type: GET_FAVORITES,
      payload: result
    });
  };
};

export default getFavorites;
