import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { firstStepSchema } from '../../schemas/firstStep';
import { ProjectCreate } from 'store/projects/projects.types';
import { Button } from '@mui/material';
import InputField from 'components/InputField';

const initialValues = {
  name: '',
  description: '',
};

interface FirstStepProps {
  onCreate: (value: ProjectCreate) => void;
}

const FirstStep = ({ onCreate }: FirstStepProps) => {
  const onSubmit = useCallback(
    (result: { name: string; description: string }) => {
      onCreate(result);
    },
    [onCreate],
  );

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: firstStepSchema,
    initialValues,
    initialErrors: initialValues,
    onSubmit,
  });

  return (
    <FirstStep.Container onSubmit={formik.handleSubmit}>
      <InputField
        label="Project name"
        name="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={formik.errors.name}
        touched={Boolean(formik.touched.name)}
      />

      <InputField
        label="Project description"
        name="description"
        type="text"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={formik.errors.description}
        touched={Boolean(formik.touched.description)}
      />

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
        Next
      </Button>
    </FirstStep.Container>
  );
};

FirstStep.Container = styled.form`
  width: fit-content;
  display: flex;
  flex-direction: column;

  .button {
    margin-left: auto;
    height: 37px;
  }
`;

export default FirstStep;
