 import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { BackgroundContainer } from './styles';
import { useUserState } from '../../context/User';
import { PublicRoute, ProtectedRoute } from './AppRoute';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Dashboard from '../../pages/Dashboard';
 
const App = () => {
  const user = useUserState();
  const jwt = localStorage.getItem('jwt');
  const isAuth = user.isAuth || (jwt !== undefined);
  
  return (
      <BackgroundContainer>
        <Router>
          <Switch>
            <PublicRoute
              isAuth={isAuth}
              exact path="/"
              component={Login}
            />
            <PublicRoute
              isAuth={isAuth}
              exact path="/register"
              component={Register}
            />
            <ProtectedRoute
              isAuth={isAuth}
              exact path="/dashboard"
              component={Dashboard}
            />
          </Switch>
        </Router>
      </BackgroundContainer>
  );
}
 
export default App;
