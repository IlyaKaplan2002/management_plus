import { AppBar, Button } from '@mui/material';
import styled from 'styled-components';
import React from 'react';

import { login } from 'store/auth/auth.actions';
import { useAppDispatch } from './store/index';

function App() {
  const dispatch = useAppDispatch();

  return (
    <AppBar className="App">
      <App.Button
        onClick={() =>
          dispatch(login({ password: 'test1111', email: 'test@mail.co' }))
        }
      >
        test
      </App.Button>
      <App.Button
        onClick={() =>
          dispatch(login({ password: 'test1111', email: 'test@mail.com' }))
        }
      >
        test1
      </App.Button>
    </AppBar>
  );
}

App.Button = styled(Button)`
  color: #000;
`;

export default App;
