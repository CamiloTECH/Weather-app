import { Dispatch } from "redux";

import { DetailCity } from "../../models";
import { GET_CITY_DETAILS } from "../actionTypes";
import URL from "./url";

const getCityDetails = (
  lat: number | string,
  lon: number | string,
  token: string
) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/details?lat=${lat}&lon=${lon}`, {
      headers: { Authorization: `bearer ${token}` }
    });
    const result: DetailCity = await response.json();

    return dispatch({ type: GET_CITY_DETAILS, payload: result });
  };
};

export default getCityDetails;
