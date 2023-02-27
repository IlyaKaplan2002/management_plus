import { Button } from '@mui/material';
import InputField from 'components/InputField';
import { FormikHelpers, useFormik } from 'formik';
import styled from 'styled-components';
import { addCostsCategorySchema } from '../schemas/addCostsCategory';

export interface CostsCategoryFormData {
  name: string;
}

export const initialValues = {
  name: '',
};

interface AddCostsCategoryProps {
  onSubmit: (
    data: CostsCategoryFormData,
    helpers: FormikHelpers<CostsCategoryFormData>,
  ) => void;
}

const AddCostsCategory = ({ onSubmit }: AddCostsCategoryProps) => {
  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: addCostsCategorySchema,
    initialValues,
    initialErrors: initialValues,
    onSubmit,
  });

  return (
    <AddCostsCategory.FormWrapper onSubmit={formik.handleSubmit}>
      <InputField
        label="Costs category name"
        name="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={formik.errors.name}
        touched={Boolean(formik.touched.name)}
      />

      <Button
        type="submit"
        className="button"
        disabled={Boolean(formik.errors.name) || !Boolean(formik.values.name)}
      >
        Add
      </Button>
    </AddCostsCategory.FormWrapper>
  );
};

AddCostsCategory.FormWrapper = styled.form`
  width: fit-content;
  display: flex;
  flex-direction: column;

  .button {
    margin-left: auto;
    height: 37px;
  }
`;

export default AddCostsCategory;
