import { Dispatch } from "redux";

import { StatusUser } from "../../models";
import { SING_IN } from "../actionTypes";
import URL from "./url";

const singIn = (info: { email: string; password: string }) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/loginUser`, {
      method: "POST",
      body: JSON.stringify(info),
      headers: { "Content-Type": "application/json" }
    });
    const result: StatusUser = await response.json();

    return dispatch({ type: SING_IN, payload: result });
  };
};

export default singIn;
