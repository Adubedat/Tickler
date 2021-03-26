import React, { useState } from 'react';
import { H1Title, H2Title, MainContainer, FormContainer, AuthContainer, LogoContainer, ButtonStyle } from './styles';
import {ReactComponent as ReactLogo} from '../../logo.svg';
import { InputGroup, Button, Intent, FormGroup } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

const Login = () => {
  const [email, setEmail] = useState<string>('');// eslint-disable-line
  const [password, setPassword] = useState<string>('');// eslint-disable-line
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<boolean>(false);//eslint-disable-line

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
            <FormGroup
              label="Username"
              labelFor="username-input"
              helperText={helperText && "Helper text with details..."}
              intent={helperText? Intent.DANGER: Intent.NONE}
              labelInfo={"(required)"}
            >
              <InputGroup
                id="username-input"
                large={true}
                placeholder="Enter your username..."
                intent={helperText? Intent.DANGER: Intent.NONE}
              />
            </FormGroup>
            <FormGroup
              label="Password"
              labelFor="password-input"
              helperText={helperText && "Helper text with details..."}
              intent={helperText? Intent.DANGER: Intent.NONE}
              labelInfo={"(required)"}
            >
              <InputGroup
                id="password-input"
                large={true}
                placeholder="Enter your password..."
                rightElement={lockButton}
                type={showPassword ? "text" : "password"}
                intent={helperText? Intent.DANGER: Intent.NONE}
              />
            </FormGroup>
            <Button type="submit" style={ButtonStyle}>
              Login
            </Button>
            <p>
             <br />
              Not registered yet ?&nbsp;
              <a href="http://localhost:3000">
                Create your free account here
              </a>
            </p>
          </form>
        </FormContainer>
      </AuthContainer>
    </MainContainer>
  );
};
export default Login;