import React, { useState } from 'react';
import { H1Title, H2Title, MainContainer, FormContainer } from './styles';

const Register = () => {
  const [email, setEmail] = useState<string>('');// eslint-disable-line
  const [password, setPassword] = useState<string>('');// eslint-disable-line

  return (
    <MainContainer>
      <H1Title>Fake github issues</H1Title>
      <H2Title>Sign in</H2Title>
      <FormContainer>
        <form>
          <input
            type="text"
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
          />
          <br />
          <button type="submit">
            Sign in
          </button>
        </form>
      </FormContainer>
    </MainContainer>
  );
};
export default Register;