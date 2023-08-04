import { Dispatch } from "redux";

import { Status } from "../../models";
import { CHANGE_PASSWORD } from "../actionTypes";
import URL from "./url";

const changePassword = (password: string, token: string) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/changePassword/${token}`, {
      method: "PUT",
      body: password,
      headers: { "Content-Type": "application/json" }
    });
    const result: Status = await response.json();

    return dispatch({ type: CHANGE_PASSWORD, payload: result });
  };
};

export default changePassword;
