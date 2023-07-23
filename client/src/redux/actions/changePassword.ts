import { Dispatch } from "redux";

import { Status } from "../../models";
import { CHANGE_PASSWORD, LOADING } from "../actionTypes";
import URL from "./url";

const changePassword = (password: string , token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: LOADING,
      payload: { status: true, component: "changePassword" }
    });
    const response = await fetch(`${URL}/changePassword/${token}`, {
      method: "PUT",
      body: JSON.stringify(password),
      headers: { "Content-Type": "application/json" }
    });
    const result: Status = await response.json();

    dispatch({
      type: LOADING,
      payload: { status: false, component: "" }
    });
    return dispatch({ type: CHANGE_PASSWORD, payload: result });
  };
};

export default changePassword;
