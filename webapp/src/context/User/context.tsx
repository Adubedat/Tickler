import React, { useReducer } from "react";
import { UserReducer, initialState, IinitialState } from './reducer';
 
const UserStateContext = React.createContext<IinitialState>(initialState);
const UserDispatchContext = React.createContext<React.Dispatch<any>>(() => null);

type Props = {
  children: React.ReactNode
};

export function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within an UserProvider");
  }
 
  return context;
}
 
export function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within an UserProvider");
  }
 
  return context;
}

export const UserProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(UserReducer, initialState);
 
  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};
