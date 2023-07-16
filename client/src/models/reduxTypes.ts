import { City } from "./CityType";
import { DetailCity } from "./DetailCityType";

export interface ReducerState {
  citys: City[];
  cityDetail: DetailCity | undefined;
  statusFavorites: {
    status: boolean;
  };
  statusLogin: {
    status: boolean | undefined;
    token?: string;
    message?: string;
  };
  statusRegister: { status: boolean | undefined };
  statusChangePassword: { status: boolean | undefined; message?: string };
  loading: { status: boolean; component: string };
  generalError: string;
}

export interface actionTypes {
  type: string;
  payload: any;
}
