import { Dispatch } from "redux";

import { Status } from "../../models";
import { SING_UP } from "../actionTypes";
import URL from "./url";

interface Info {
  email: string;
  password: string;
  userName: string;
}

const singUp = (info: Info) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/registerUser`, {
      method: "POST",
      body: JSON.stringify(info),
      headers: { "Content-Type": "application/json" }
    });
    const result: Status = await response.json();

    return dispatch({ type: SING_UP, payload: result });
  };
};

export default singUp;
