import { Button } from '@mui/material';
import React from 'react';
import { useAppDispatch } from 'store';
import { authActions } from 'store/auth';

const Dashboard = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Button onClick={() => dispatch(authActions.logout())}>logout</Button>
    </>
  );
};

export default Dashboard;
