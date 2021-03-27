 
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import routes from '../../config/routes';
import { BackgroundContainer } from './styles';
import { AuthProvider } from '../../context/Auth';
 
function App() {
  console.log(routes);
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
 
export default App;
