import {
  Analytics,
  Dashboard,
  ProductionQuantityLimits,
  Settings,
  Timelapse,
} from '@mui/icons-material';
import Login from 'modules/auth/pages/Login';
import Register from 'modules/auth/pages/Register';
import Project from 'modules/projects/pages/Project';
import ProjectDashboard from 'modules/dashboard/pages/ProjectDashboard';
import Projects from 'modules/projects/pages/Projects';
import NotFound from './pages/NotFound';
import { RouteItem } from './types';
import SettingsPage from 'modules/settings/pages/SettingsPage';
import ProductsPage from 'modules/products/pages/ProductsPage';
import PeriodsPage from 'modules/periods/pages/PeriodsPage';
import StatisticsPage from 'modules/statistics/pages/StatisticsPage';

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
    name: 'Project',
    element: Project,
    path: '/projects/:id',
    isProtected: true,
    isRestricted: false,
    redirect: '/login',
  },
  dashboard: {
    name: 'Dashboard',
    element: ProjectDashboard,
    path: '/projects/:id/dashboard',
    isProtected: true,
    isRestricted: false,
    redirect: '/login',
    icon: Dashboard,
  },
  projectStatistics: {
    name: 'Statistics',
    element: StatisticsPage,
    path: '/projects/:id/statistics',
    isProtected: true,
    isRestricted: false,
    redirect: '/login',
    icon: Analytics,
  },
  projectProducts: {
    name: 'Products',
    element: ProductsPage,
    path: '/projects/:id/products',
    isProtected: true,
    isRestricted: false,
    redirect: '/login',
    icon: ProductionQuantityLimits,
  },
  projectPeriods: {
    name: 'Periods',
    element: PeriodsPage,
    path: '/projects/:id/periods',
    isProtected: true,
    isRestricted: false,
    redirect: '/login',
    icon: Timelapse,
  },
  projectSettings: {
    name: 'Settings',
    element: SettingsPage,
    path: '/projects/:id/settings',
    isProtected: true,
    isRestricted: false,
    redirect: '/login',
    icon: Settings,
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
