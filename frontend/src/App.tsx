import GlobalStyle from 'components/GlobalStyles';
import useAuth from 'hooks/useAuth';
import Router from 'modules/router/containers/Router';
import React, { useCallback, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { authActions } from 'store/auth';
import { useAppDispatch } from './store/index';

function App() {
  const { user, isLoggedIn, loading } = useAuth();
  const dispatch = useAppDispatch();

  const checkUser = useCallback(async () => {
    if (isLoggedIn && !user && !loading) {
      await dispatch(authActions.getCurrentUser());
    }
  }, [isLoggedIn, user, dispatch, loading]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Router />
    </BrowserRouter>
  );
}

export default App;
