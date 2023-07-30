import { City } from "./CityType";
import { DetailCity } from "./DetailCityType";

export interface Status {
  status: boolean;
}

export interface StatusUser {
  status: boolean;
  token?: string;
  message?: string;
}

export interface ReducerState {
  citys: City[];
  cityDetail: DetailCity | undefined;
  statusFavorites: Status;
  statusLogin: {
    status: boolean | undefined;
    token?: string;
    message?: string;
  };
  statusRegister: { status: boolean | undefined };
  statusChangePassword: { status: boolean | undefined; message?: string };
}

export interface actionTypes {
  type: string;
  payload: any;
}

export interface Info {
  ciudad: string;
}
