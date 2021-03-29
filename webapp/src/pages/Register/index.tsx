import React, { useState, MouseEvent } from 'react';
import { H1Title, H2Title, MainContainer, FormContainer, AuthContainer, LogoContainer, ButtonStyle } from './styles';
import { ReactComponent as ReactLogo } from '../../logo.svg';
import { InputGroup, Button, Intent, FormGroup } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { USERS_SERVICE_URL, ROOT_URL } from '../../constants';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';


export const Register = ({ history }: {history: RouteComponentProps["history"]}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);



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

  const handleErrorMessage = (responseMessage: string) => {
    responseMessage.split(',').forEach(elem => {
      const messages = elem.split(':');
      if (messages[messages.length - 1].includes('Username')) {
        setUsernameErrorMessage(messages[messages.length - 1]);
      }
      else if (messages[messages.length - 1].includes('Password')) {
        setPasswordErrorMessage(messages[messages.length - 1]);
      }
    })
  }

  const handleRegister = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setPasswordErrorMessage(null);
    setUsernameErrorMessage(null);
    const payload = { username, password };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(`${USERS_SERVICE_URL}/users`, requestOptions);
      const json = await response.json();
      if (response.status >= 400) {
        handleErrorMessage(json.message);
        return;
      } 
      history.push('/');
    } catch (error) {
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
            <H1Title style={{color: '#182026'}}>Register</H1Title>
            <FormGroup
              label="Username"
              labelFor="username-input"
              intent={usernameErrorMessage? Intent.DANGER: Intent.NONE}
              helperText={usernameErrorMessage}
              labelInfo={"(required)"}
            >
              <InputGroup
                id="username-input"
                large={true}
                placeholder="Enter your username..."
                intent={usernameErrorMessage? Intent.DANGER: Intent.NONE}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup
              label="Password"
              labelFor="password-input"
              intent={passwordErrorMessage? Intent.DANGER: Intent.NONE}
              helperText={passwordErrorMessage}
              labelInfo={"(required)"}
            >
              <InputGroup
                id="password-input"
                large={true}
                placeholder="Enter your password..."
                rightElement={lockButton}
                type={showPassword ? "text" : "password"}
                intent={passwordErrorMessage? Intent.DANGER: Intent.NONE}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button
              onClick={handleRegister}
              type="submit"
              style={ButtonStyle}
            >
              Register
            </Button>
            <p style={{textAlign: 'center'}}>
             <br />
              Already have an account ?&nbsp;
              <a href={`${ROOT_URL}/`}>
                Login here
              </a>
            </p>
          </form>
        </FormContainer>
      </AuthContainer>
    </MainContainer>
  );
};
export default withRouter(Register);