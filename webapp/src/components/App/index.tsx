import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../Login';
import SignUp from '../Register';
import { BackgroundContainer } from './styles';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // eslint-disable-line

  // fire.auth().onAuthStateChanged((user) => (user ? setIsLoggedIn(true) : setIsLoggedIn(false)));

  // const signOut = () => {
  //   fire.auth().signOut();
  // };
  console.log('logged in?', isLoggedIn);
  return (
    <BackgroundContainer>
      <Router>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
          <Route path="/join">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </BackgroundContainer>
  );
}
export default App;
