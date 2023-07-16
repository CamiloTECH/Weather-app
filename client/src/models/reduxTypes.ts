export interface ReducerState {
  citys: [];
  cityDetail: {};
  statusFavorites: {};
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
