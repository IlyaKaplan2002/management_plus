import Login from 'modules/auth/pages/Login';
import Register from 'modules/auth/pages/Register';
import Dashboard from 'modules/dashboard/pages/Dashboard';
import { RouteItem } from './types';

export const routes: { [key: string]: RouteItem } = {
  home: {
    name: 'Dashboard',
    element: Dashboard,
    path: '/',
    isProtected: true,
    redirect: '/login',
  },
  login: {
    name: 'Login',
    element: Login,
    path: '/login',
    isProtected: false,
    redirect: '/',
  },
  register: {
    name: 'Register',
    element: Register,
    path: '/register',
    isProtected: false,
    redirect: '/',
  },
};
