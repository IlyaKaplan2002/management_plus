import { Button } from '@mui/material';
import InputField from 'components/InputField';
import { FormikHelpers, useFormik } from 'formik';
import styled from 'styled-components';
import { addProjectSchema } from '../schemas/addProject';

const defaultInitialValues = {
  name: '',
  description: '',
};

interface ProjectFormData {
  name: string;
  description: string;
}

interface AddProjectProps {
  initialValues?: ProjectFormData;
  onSubmit: (
    data: ProjectFormData,
    helpers: FormikHelpers<ProjectFormData>,
  ) => void;
  submitButtonText?: string;
}

const AddProject = ({
  onSubmit,
  initialValues,
  submitButtonText,
}: AddProjectProps) => {
  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: addProjectSchema,
    initialValues: initialValues || defaultInitialValues,
    initialErrors: defaultInitialValues,
    onSubmit,
  });

  return (
    <AddProject.Container onSubmit={formik.handleSubmit}>
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
        {submitButtonText || 'Submit'}
      </Button>
    </AddProject.Container>
  );
};

AddProject.Container = styled.form`
  width: fit-content;
  display: flex;
  flex-direction: column;

  .button {
    margin-left: auto;
    height: 37px;
  }
`;

export default AddProject;
