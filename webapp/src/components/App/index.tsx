 import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { BackgroundContainer } from './styles';
import { useUserDispatch, useUserState } from '../../context/User';
import { PublicRoute, ProtectedRoute } from './AppRoute';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Dashboard from '../../pages/Dashboard';
import { checkUserAuth } from '../../context/User/actions';
 
const App = () => {
  const user = useUserState();
  const dispatch = useUserDispatch()
  const jwt = localStorage.getItem('jwt');
  if (jwt !== null && user.isAuth === false) {
    checkUserAuth(dispatch);
  }
  // const isAuth = user.isAuth || (jwt !== null);
  
  return (
      <BackgroundContainer>
        <Router>
          <Switch>
            <PublicRoute
              isAuth={user.isAuth}
              exact path="/"
              component={Login}
            />
            <PublicRoute
              isAuth={user.isAuth}
              exact path="/register"
              component={Register}
            />
            <ProtectedRoute
              isAuth={user.isAuth}
              exact path="/dashboard"
              component={Dashboard}
            />
          </Switch>
        </Router>
      </BackgroundContainer>
  );
}
 
export default App;
