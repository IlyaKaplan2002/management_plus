import { AppBar, Button } from '@mui/material';
import styled from 'styled-components';
import React from 'react';

function App() {
  return (
    <AppBar className="App">
      <App.Button>test</App.Button>
    </AppBar>
  );
}

App.Button = styled(Button)`
  color: #000;
`;

export default App;
