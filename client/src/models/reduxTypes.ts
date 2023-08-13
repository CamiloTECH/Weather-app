import City from "./CityType";
import { DetailCity } from "./DetailCityType";

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

export interface ActionTypes {
  type: string;
  payload: any;
}

export interface Info {
  ciudad: string;
}
