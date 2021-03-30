import React, { useState, MouseEvent } from 'react';
import { H1Title, H2Title, MainContainer, FormContainer, AuthContainer, LogoContainer, ButtonStyle } from './styles';
import { ReactComponent as ReactLogo } from '../../logo.svg';
import { InputGroup, Button, Intent, FormGroup } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import { useUserDispatch } from '../../context/User';
import { updateUser } from '../../context/User';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { USERS_SERVICE_URL, ROOT_URL } from '../../constants';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';


export const Login = ({ history }: {history: RouteComponentProps["history"]}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const dispatch = useUserDispatch();

  const lockButton = (
    <Tooltip2 content={`${showPassword ? "Hide" : "Show"} Password`}>
        <Button
            icon={showPassword ? "unlock" : "lock"}
            intent={Intent.WARNING}
            minimal={true}
            onClick={() => setShowPassword(!showPassword)}
        />
    </Tooltip2>
  );

  const DisplayError = () => {
    if (error) {
      return (<p style={{textAlign: 'center', color: '#c23030'}}>Invalid username or password</p>);
    }
    return null;
  }

  const handleLogin = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const payload = { username, password };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(`${USERS_SERVICE_URL}/auth`, requestOptions);
      const json = await response.json();
      if (response.status >= 400) {
        setError(true);
        return;
      }
      updateUser(dispatch, json.data);
      setError(false);
      history.push('/dashboard');
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }
  
  return (
    <MainContainer>
      <AuthContainer>
        <LogoContainer>
          <ReactLogo />
        </LogoContainer>
        <H1Title>Tickler</H1Title>
        <H2Title>Debugging has never been so fun</H2Title>
        <FormContainer>
          <form>
            <H1Title style={{color: '#182026'}}>Login</H1Title>
            <DisplayError />
            <FormGroup
              label="Username"
              labelFor="username-input"
              intent={error? Intent.DANGER: Intent.NONE}
              labelInfo={"(required)"}
            >
              <InputGroup
                id="username-input"
                large={true}
                placeholder="Enter your username..."
                intent={error? Intent.DANGER: Intent.NONE}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup
              label="Password"
              labelFor="password-input"
              intent={error? Intent.DANGER: Intent.NONE}
              labelInfo={"(required)"}
            >
              <InputGroup
                id="password-input"
                large={true}
                placeholder="Enter your password..."
                rightElement={lockButton}
                type={showPassword ? "text" : "password"}
                intent={error? Intent.DANGER: Intent.NONE}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button
              onClick={handleLogin}
              type="submit"
              style={ButtonStyle}
            >
              Login
            </Button>
            <p style={{textAlign: 'center'}}>
             <br />
              Not registered yet ?&nbsp;
              <a href={`${ROOT_URL}/register`}>
                Register here
              </a>
            </p>
          </form>
        </FormContainer>
      </AuthContainer>
    </MainContainer>
  );
};
export default withRouter(Login);