import React from 'react';
import styled from 'styled-components';
import RegisterForm from '../forms/RegisterForm';

const Register = () => {
  return (
    <Register.Wrapper>
      <RegisterForm />
    </Register.Wrapper>
  );
};

Register.Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 100px;
  justify-content: center;
  display: flex;
`;

export default Register;
