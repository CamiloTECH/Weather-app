import { Dispatch } from "redux";

import { Status } from "../../models";
import { LOADING, SING_UP } from "../actionTypes";
import URL from "./url";

interface Info {
  email: string;
  password: string;
  userName: string;
}

const singUp = (info: Info) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOADING, payload: { status: true, component: "SignUp" } });
    const response = await fetch(`${URL}/registerUser`, {
      method: "POST",
      body: JSON.stringify(info),
      headers: { "Content-Type": "application/json" }
    });
    const result: Status = await response.json();

    dispatch({
      type: LOADING,
      payload: { status: false, component: "" }
    });
    return dispatch({ type: SING_UP, payload: result });
  };
};

export default singUp;
