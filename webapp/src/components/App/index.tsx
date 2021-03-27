 
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import routes from '../../config/routes';
import { BackgroundContainer } from './styles';
import { UserProvider } from '../../context/User';
 
function App() {
  return (
    <UserProvider>
      <BackgroundContainer>
        <Router>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                exact path={route.path}
              >
                <route.component />
              </Route>
              ))}
          </Switch>
        </Router>
      </BackgroundContainer>
    </UserProvider>
  );
}
 
export default App;
