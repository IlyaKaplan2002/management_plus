import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import styled from 'styled-components';
import React, { useState, MouseEvent, useCallback, useEffect } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { useAppDispatch } from 'store/index';
import { authActions } from 'store/auth';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import ProjectsSelectors from '../store/projects/projects.selectors';
import ProjectsActions from '../store/projects/projects.actions';
import ErrorAlert from './ErrorAlert';

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const DefaultLayout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);

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
    dispatch(authActions.logout());
    onClose();
  }, [dispatch, onClose]);

  const onLogoClick = useCallback(() => navigate('/'), [navigate]);

  const fetchProjects = useCallback(async () => {
    await dispatch(ProjectsActions.get());
    setOpen(true);
  }, [dispatch]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <>
      <HideOnScroll>
        <AppBar>
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
                <MenuItem onClick={onClose}>Profile</MenuItem>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </DefaultLayout.Bar>
        </AppBar>
      </HideOnScroll>
      <DefaultLayout.MainWrapper>
        {projectsLoading ? <Loader /> : children}
      </DefaultLayout.MainWrapper>

      <ErrorAlert open={open} error={projectsError} setOpen={setOpen} />
    </>
  );
};

DefaultLayout.MainWrapper = styled.div`
  padding: 92px 50px;
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
