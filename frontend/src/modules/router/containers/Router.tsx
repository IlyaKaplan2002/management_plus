import useAuth from 'hooks/useAuth';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Navigate, Route, Routes } from 'react-router-dom';

import { routes } from '../constants';

const Router = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {Object.keys(routes).map(key => {
        const {
          isProtected,
          isRestricted,
          element: Component,
          redirect,
          path,
          name,
        } = routes[key];

        if ((isRestricted && isLoggedIn) || (isProtected && !isLoggedIn)) {
          return (
            <Route
              key={path}
              path={path}
              element={<Navigate to={redirect} />}
            />
          );
        }

        return (
          <Route
            key={path}
            path={path}
            element={
              <>
                <Helmet>
                  <title>Management + | {name}</title>
                </Helmet>
                <Component />
              </>
            }
          />
        );
      })}
    </Routes>
  );
};

export default Router;
