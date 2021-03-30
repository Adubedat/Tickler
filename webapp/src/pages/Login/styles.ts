import styled from "styled-components";

export const ButtonStyle = {
  width: '100%',
  background: 'none #008aa8aa',
  color: '#ffffff'
}

export const H1Title = styled.p`
  text-align: center;
  font-size: 2em;
  color: #ffffff;
`;

export const H2Title = styled.p`
  font-size: 1.5em;
  color: #ffffff;
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction:column;
`;

export const AuthContainer = styled.div`
  flex-basis: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.div`
  width: 250px;
`;

export const FormContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: rgb(246, 248, 250);
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #eaecef;
`;