import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import { useState, MouseEvent, useCallback, useEffect, ReactNode } from 'react';
import { AccountCircle, ArrowBackIos } from '@mui/icons-material';
import { useAppDispatch } from 'store/index';
import { authActions } from 'store/auth';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import ProjectsSelectors from '../store/projects/projects.selectors';
import ProjectsActions from '../store/projects/projects.actions';
import ErrorAlert from './ErrorAlert';
import useAuth from 'hooks/useAuth';
import { routes } from 'modules/router/constants';

interface DefaultLayoutProps {
  children: ReactNode;
  showDrawer?: boolean;
  project?: { name: string; id: string };
}

const DefaultLayout = ({
  children,
  showDrawer,
  project,
}: DefaultLayoutProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const { isLoggedIn } = useAuth();

  const projectsLoading = useSelector(ProjectsSelectors.getLoading);
  const projectsError = useSelector(ProjectsSelectors.getError);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onOpen = useCallback(
    (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget),
    [],
  );
  const onClose = useCallback(() => setAnchorEl(null), []);

  const onLogout = useCallback(() => {
    if (!isLoggedIn) return;
    dispatch(authActions.logout());
    onClose();
  }, [dispatch, onClose, isLoggedIn]);

  const onLogoClick = useCallback(() => navigate('/'), [navigate]);

  const fetchProjects = useCallback(async () => {
    await dispatch(ProjectsActions.get());
    setOpen(true);
  }, [dispatch]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <DefaultLayout.Bar>
          <IconButton onClick={onLogoClick}>
            <DefaultLayout.Logo>M+</DefaultLayout.Logo>
          </IconButton>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={onOpen}
              color="inherit"
            >
              <DefaultLayout.AccIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={onClose}
            >
              {/* <MenuItem onClick={onClose}>Profile</MenuItem> */}
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </DefaultLayout.Bar>
      </AppBar>

      {showDrawer && (
        <Drawer
          sx={{
            width: 200,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 200,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Toolbar sx={{ justifyContent: 'center' }}>
            <Typography variant="h5">{project?.name}</Typography>
          </Toolbar>
          <Divider />

          <List>
            {[
              { ...routes.dashboard },
              { ...routes.projectStatistics },
              { ...routes.projectProducts },
              { ...routes.projectPeriods },
              { ...routes.projectSettings },
            ].map(({ path, icon: Icon, name }) => (
              <ListItem key={path} disablePadding>
                <ListItemButton
                  onClick={() =>
                    navigate(path.replace(':id', project?.id || ''))
                  }
                >
                  <ListItemIcon>{Icon && <Icon />}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/projects')}>
                <ListItemIcon>
                  <ArrowBackIos />
                </ListItemIcon>
                <ListItemText primary="Go back" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      )}
      <DefaultLayout.MainWrapper>
        {projectsLoading ? <Loader /> : children}
      </DefaultLayout.MainWrapper>

      <ErrorAlert open={open} error={projectsError} setOpen={setOpen} />
    </Box>
  );
};

DefaultLayout.MainWrapper = styled(Box)`
  flex-grow: 1;
  padding: 92px 50px 50px;
  min-height: 100vh;
`;

DefaultLayout.Logo = styled(Typography)`
  font-weight: 800;
  font-size: 30px;
  text-shadow: 2px 2px 3px black;
  color: white;
`;

DefaultLayout.Bar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

DefaultLayout.AccIcon = styled(AccountCircle)`
  width: 48px;
  height: 48px;
`;

export default DefaultLayout;
