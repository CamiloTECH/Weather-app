import { Dispatch } from "redux";

import { StatusUser } from "../../models";
import { SING_IN } from "../actionTypes";
import URL from "./url";

const singInGoogle = (info: { email: string; userName: string }) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/logingoogle`, {
      method: "POST",
      body: JSON.stringify(info),
      headers: { "Content-Type": "application/json" }
    });
    const result: StatusUser = await response.json();
    dispatch({ type: SING_IN, payload: result });
  };
};

export default singInGoogle;
