export interface IinitialState {
  id: String;
  username: String;
  role: String;
  isAuth: Boolean;
}

export const initialState = {
  id: "",
  username: "",
  role: "",
  isAuth: false,
};

export const UserReducer = (initialState: IinitialState, action: any) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...initialState,
        id: action.payload.id,
        username: action.payload.username,
        role: action.payload.role,
        isAuth: true,
      };
 
    case "LOGOUT":
      return {
        ...initialState,
        id: "",
        username: "",
        role: "",
        isAuth: false,
      };
 
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
