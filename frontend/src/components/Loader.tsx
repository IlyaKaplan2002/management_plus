import { CircularProgress } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Loader = () => (
  <Loader.Wrapper>
    <CircularProgress size={40} />
  </Loader.Wrapper>
);

Loader.Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loader;
