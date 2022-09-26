import useAuth from 'hooks/useAuth';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { routes } from '../constants';

const Router = () => {
  const auth = useAuth();

  return (
    <Routes>
      {Object.keys(routes).map(key => {
        const { isProtected, element: Component, redirect, path } = routes[key];

        if (isProtected && auth.isLoggedIn) {
          return <Route key={path} path={path} element={<Component />} />;
        }
        if (!isProtected && !auth.isLoggedIn) {
          return <Route key={path} path={path} element={<Component />} />;
        }
        return (
          <Route key={path} path={path} element={<Navigate to={redirect} />} />
        );
      })}
    </Routes>
  );
};

export default Router;
