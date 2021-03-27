//  let user = localStorage.getItem("currentUser")
//   ? JSON.parse(localStorage.getItem("currentUser") || '{}').user
//   : "";
// let token = localStorage.getItem("currentUser")
//   ? JSON.parse(localStorage.getItem("currentUser") || '{}').auth_token
//   : "";
 
export interface IinitialState {
  username: String;
  role: String;
  isAuth: Boolean;
}

export const initialState = {
  username: "",
  role: "",
  isAuth: false,
};

export const UserReducer = (initialState: IinitialState, action: any) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        username: action.payload.username,
        role: action.payload.role,
        isAuth: true,
      };
 
    case "AUTH_ERROR":
      return {
        ...initialState,
        isAuth: false,
      };
 
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
