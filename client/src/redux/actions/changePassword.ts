import { Dispatch } from "redux";

import { CHANGE_PASSWORD } from "../actionTypes";
import URL from "./url";

const changePassword = (password: string, token: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/changePassword/${token}`, {
      method: "PUT",
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json();

    return dispatch({ type: CHANGE_PASSWORD, payload: result });
  };
};

export default changePassword;
