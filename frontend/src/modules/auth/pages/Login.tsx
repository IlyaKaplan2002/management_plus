import React from 'react';
import styled from 'styled-components';
import LoginForm from '../forms/LoginForm';

const Login = () => (
  <Login.Wrapper>
    <LoginForm />
  </Login.Wrapper>
);

Login.Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 100px;
  justify-content: center;
  display: flex;
`;

export default Login;
