import Login from 'modules/auth/pages/Login';
import Register from 'modules/auth/pages/Register';
import Dashboard from 'modules/dashboard/pages/Dashboard';
import ProjectDashboard from 'modules/projects/pages/ProjectDashboard';
import Projects from 'modules/projects/pages/Projects';
import NotFound from './pages/NotFound';
import { RouteItem } from './types';

export const routes: { [key: string]: RouteItem } = {
  projects: {
    name: 'Projects',
    element: Projects,
    path: '/projects',
    isProtected: true,
    isRestricted: false,
    redirect: '/login',
  },
  projectDashboard: {
    name: 'Project Dashboard',
    element: ProjectDashboard,
    path: '/projects/:id',
    isProtected: true,
    isRestricted: false,
    redirect: '/login',
  },
  dashboard: {
    name: 'Dashboard',
    element: Dashboard,
    path: '/dashboard',
    isProtected: true,
    isRestricted: false,
    redirect: '/login',
  },
  login: {
    name: 'Login',
    element: Login,
    path: '/login',
    isProtected: false,
    isRestricted: true,
    redirect: '/projects',
  },
  register: {
    name: 'Register',
    element: Register,
    path: '/register',
    isProtected: false,
    isRestricted: true,
    redirect: '/projects',
  },
  notFound: {
    name: 'Not found',
    element: NotFound,
    path: '*',
    isProtected: false,
    isRestricted: false,
    redirect: '/projects',
  },
};
