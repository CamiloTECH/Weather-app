import { Dispatch } from "redux";

import { GET_CITY, UPDATE_STATUS } from "../actionTypes";
import URL from "./url";

const getCity = (name: string, token: string, updateStatus: boolean) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/city/${name.toLocaleLowerCase()}`, {
      headers: { Authorization: `bearer ${token}` }
    });
    const result = await response.json();
    return dispatch({
      type: updateStatus ? UPDATE_STATUS : GET_CITY,
      payload: result
    });
  };
};

export default getCity;
