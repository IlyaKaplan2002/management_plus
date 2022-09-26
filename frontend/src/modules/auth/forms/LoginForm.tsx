import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Snackbar,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import styled from 'styled-components';
import React, { useCallback, useState } from 'react';
import { loginSchema } from '../schemas/login';
import { useAppDispatch } from '../../../store/index';
import { authActions } from 'store/auth';
import useAuth from 'hooks/useAuth';
import { LoginProps } from 'store/auth/auth.types';
import { Link } from 'react-router-dom';
import { routes } from 'modules/router/constants';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const { error, loading } = useAuth();

  const [open, setOpen] = useState(false);

  const onSubmit = useCallback(
    async (data: LoginProps) => {
      await dispatch(authActions.login(data));
      setOpen(true);
    },
    [dispatch],
  );

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit,
    initialValues,
    initialErrors: initialValues,
    validationSchema: loginSchema,
  });

  return (
    <LoginForm.Container onSubmit={formik.handleSubmit}>
      <FormControl className="formItem">
        <InputLabel>Email</InputLabel>
        <Input
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.email) && formik.touched.email}
        />
        {Boolean(formik.errors.email) && formik.touched.email && (
          <FormHelperText className="error">
            {formik.errors.email}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl className="formItem">
        <InputLabel>Password</InputLabel>
        <Input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.password) && formik.touched.password}
        />
        {Boolean(formik.errors.password) && formik.touched.password && (
          <FormHelperText className="error">
            {formik.errors.password}
          </FormHelperText>
        )}
      </FormControl>

      <Button type="submit" className="button" disabled={loading}>
        {loading ? <CircularProgress size={20} /> : 'Log in'}
      </Button>

      <Typography
        className="link"
        variant="body2"
        component={Link}
        to={routes.register.path}
      >
        Don't have an account yet? Sign up right now
      </Typography>

      <Snackbar
        open={Boolean(error) && open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="error" onClose={() => setOpen(false)}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </LoginForm.Container>
  );
};

LoginForm.Container = styled.form`
  width: fit-content;
  display: flex;
  flex-direction: column;

  .formItem {
    margin-bottom: 30px;
  }

  .button {
    margin-bottom: 10px;
  }

  .link {
    color: #1976d2;
  }

  .error {
    color: red;
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
  }
`;

export default LoginForm;
