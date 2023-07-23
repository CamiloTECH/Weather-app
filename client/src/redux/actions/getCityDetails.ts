import { Dispatch } from "redux";

import { DetailCity } from "../../models";
import { GET_CITY_DETAILS, LOADING } from "../actionTypes";
import { changeError } from "./clearStatus";
import URL from "./url";

const getCityDetails = (lat: number | string, lon: number | string, token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOADING, payload: { status: true, component: "detail" } });

    const response = await fetch(`${URL}/details?lat=${lat}&lon=${lon}`, {
      headers: { Authorization: `bearer ${token}` }
    });
    const result: DetailCity = await response.json();

    dispatch({
      type: LOADING,
      payload: { status: false, component: "" }
    });

    return result.lat
      ? dispatch({ type: GET_CITY_DETAILS, payload: result })
      : dispatch(changeError("notFound"));
  };
};

export default getCityDetails;
