import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { firstStepSchema } from '../../schemas/firstStep';
import { ProjectCreate } from 'store/projects/projects.types';
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@mui/material';

const initialValues = {
  name: '',
  description: '',
};

interface FirstStepProps {
  setStep: (value: number) => void;
  data: ProjectCreate;
  setData: (value: any) => void;
  onCreate: (value: ProjectCreate) => void;
}

const FirstStep = ({ setStep, data, setData, onCreate }: FirstStepProps) => {
  const onSubmit = useCallback(
    (result: { name: string; description: string }) => {
      //   setData(prev => ({ ...prev, ...result }));
      //   setStep(2);
      onCreate(result);
    },
    [onCreate],
  );

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: firstStepSchema,
    initialValues: data,
    initialErrors: initialValues,
    onSubmit,
  });

  return (
    <FirstStep.Container onSubmit={formik.handleSubmit}>
      <FormControl className="formItem">
        <InputLabel>Project name</InputLabel>
        <Input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.name) && formik.touched.name}
        />
        {Boolean(formik.errors.name) && formik.touched.name && (
          <FormHelperText className="error">
            {formik.errors.name}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl className="formItem">
        <InputLabel>Project description</InputLabel>
        <Input
          type="text"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            Boolean(formik.errors.description) && formik.touched.description
          }
        />
        {Boolean(formik.errors.description) && formik.touched.description && (
          <FormHelperText className="error">
            {formik.errors.description}
          </FormHelperText>
        )}
      </FormControl>

      <Button
        type="submit"
        className="button"
        disabled={
          Boolean(formik.errors.description) ||
          Boolean(formik.errors.name) ||
          !Boolean(formik.values.name) ||
          !Boolean(formik.values.description)
        }
      >
        Create
      </Button>
    </FirstStep.Container>
  );
};

FirstStep.Container = styled.form`
  width: fit-content;
  display: flex;
  flex-direction: column;

  .formItem {
    margin-bottom: 30px;
    width: 400px;
  }

  .button {
    margin-left: auto;
    height: 37px;
  }

  .error {
    color: red;
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
  }
`;

export default FirstStep;
