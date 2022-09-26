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
import { useAppDispatch } from 'store/index';
import { authActions } from 'store/auth';
import useAuth from 'hooks/useAuth';
import { RegisterProps } from 'store/auth/auth.types';
import { registerSchema } from '../schemas/register';
import { Link } from 'react-router-dom';
import { routes } from 'modules/router/constants';

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  passwordConfirm: '',
};

const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const { error, loading } = useAuth();

  const [open, setOpen] = useState(false);

  const onSubmit = useCallback(
    async (data: RegisterProps) => {
      await dispatch(
        authActions.register({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        }),
      );
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
    validationSchema: registerSchema,
  });

  return (
    <RegisterForm.Container onSubmit={formik.handleSubmit}>
      <FormControl className="formItem">
        <InputLabel>First name</InputLabel>
        <Input
          type="text"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.firstName) && formik.touched.firstName}
        />
        {Boolean(formik.errors.firstName) && formik.touched.firstName && (
          <FormHelperText className="error">
            {formik.errors.firstName}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl className="formItem">
        <InputLabel>Last name</InputLabel>
        <Input
          type="text"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.lastName) && formik.touched.lastName}
        />
        {Boolean(formik.errors.lastName) && formik.touched.lastName && (
          <FormHelperText className="error">
            {formik.errors.lastName}
          </FormHelperText>
        )}
      </FormControl>

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

      <FormControl className="formItem">
        <InputLabel>Confirm password</InputLabel>
        <Input
          type="password"
          name="passwordConfirm"
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            Boolean(formik.errors.passwordConfirm) &&
            formik.touched.passwordConfirm
          }
        />
        {Boolean(formik.errors.passwordConfirm) &&
          formik.touched.passwordConfirm && (
            <FormHelperText className="error">
              {formik.errors.passwordConfirm}
            </FormHelperText>
          )}
      </FormControl>

      <Button type="submit" className="button" disabled={loading}>
        {loading ? <CircularProgress size={20} /> : 'Sign up'}
      </Button>

      <Typography
        className="link"
        variant="body2"
        component={Link}
        to={routes.login.path}
      >
        Already have an account? Log in right now
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
    </RegisterForm.Container>
  );
};

RegisterForm.Container = styled.form`
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

export default RegisterForm;
