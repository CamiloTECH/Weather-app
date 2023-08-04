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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export interface Info {
  ciudad: string;
}
