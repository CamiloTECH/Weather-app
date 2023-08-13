import { Dispatch } from "redux";

import { VALIDATION_EMAIL } from "../actionTypes";
import URL from "./url";

interface Validate {
  status: boolean;
  message: string;
}

const validationEmail = (email: { email: string }) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/validationEmail`, {
      method: "POST",
      body: JSON.stringify(email),
      headers: { "Content-Type": "application/json" }
    });

    const result: Validate = await response.json();

    return dispatch({ type: VALIDATION_EMAIL, payload: result });
  };
};

export default validationEmail;
