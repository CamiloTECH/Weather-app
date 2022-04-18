import { Action } from "redux";

interface Store{
  citys:[],
  cityDetail:{},
  user:{}
}

const inicialStore:Store={
  citys:[],
  cityDetail:{},
  user:{}
}

function rootReducer(store:Store=inicialStore,action:Action) {
  switch (action.type) {
    case "ssd":
      break;
  
    default:
      break;
  }
}

export default rootReducer;