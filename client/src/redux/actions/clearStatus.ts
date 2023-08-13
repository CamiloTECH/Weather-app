import {
  CLEAR_CITY_DETAIL,
  CLEAR_CITYS,
  CLEAR_USER,
  DELETE_CITY,
  LOAD_CITIES_LOCALSTORAGE
} from "../actionTypes";

export const deleteCity = (id: number) => {
  return {
    type: DELETE_CITY,
    payload: id
  };
};

export const clearCityDetail = () => {
  return {
    type: CLEAR_CITY_DETAIL,
    payload: undefined
  };
};

export const clearUser = () => {
  return { type: CLEAR_USER, payload: { status: null } };
};

export const loadCitysLocalstorage = (citys: []) => {
  return {
    type: LOAD_CITIES_LOCALSTORAGE,
    payload: citys
  };
};

export const clearCitys = () => {
  return { type: CLEAR_CITYS, payload: [] };
};
