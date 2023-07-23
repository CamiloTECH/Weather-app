import { Dispatch } from "redux";

import { City } from "../../models";
import { GET_CITY, LOADING, UPDATE_STATUS } from "../actionTypes";
import { changeError } from "./clearStatus";
import URL from "./url";

const getCity = (name: string, token: string, updateStatus: boolean) => {
  return async (dispatch: Dispatch) => {
    if (!updateStatus) {
      dispatch({
        type: LOADING,
        payload: { status: true, component: "search" }
      });
    }
    const response = await fetch(`${URL}/city/${name.toLocaleLowerCase()}`, {
      headers: { Authorization: `bearer ${token}` }
    });
    const result: City = await response.json();

    if (!updateStatus) {
      dispatch({
        type: LOADING,
        payload: { status: false, component: "" }
      });
    }
    return result.id
      ? dispatch({
          type: updateStatus ? UPDATE_STATUS : GET_CITY,
          payload: result
        })
      : dispatch(changeError("notFound"));
  };
};

export default getCity;
