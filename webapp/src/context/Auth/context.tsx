import React, { useReducer } from "react";
import { AuthReducer, initialState, IinitialState } from './reducer';
 
const AuthStateContext = React.createContext<IinitialState>(initialState);
const AuthDispatchContext = React.createContext<React.Dispatch<any>>(() => null);

type Props = {
  children: React.ReactNode
};

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
 
  return context;
}
 
export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
 
  return context;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
 
  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
