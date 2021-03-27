 import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import routes from '../../config/routes';
import { BackgroundContainer } from './styles';
import { useUserState } from '../../context/User';
 
const App = () => {
  const user = useUserState();
  
  return (
      <BackgroundContainer>
        <Router>
          <Switch>
            {routes.map((route) => {
              if (user.isAuth) {
                return <Redirect key={route.path} to={{ pathname: "/dashboard" }} />;
              }
              if(!user.isAuth && route.isPrivate) {
                return <Redirect key={route.path} to={{ pathname: "/" }} />;
              }
              return <Route key={route.path} exact path={route.path} component={route.component}/>;
            })}
          </Switch>
        </Router>
      </BackgroundContainer>
  );
}
 
export default App;
