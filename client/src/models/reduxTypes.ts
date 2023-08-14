import City from "./CityType";
import DetailCity from "./DetailCity";

interface ReducerState {
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

export default ReducerState;
