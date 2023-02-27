import { Button } from '@mui/material';
import InputField from 'components/InputField';
import { FormikHelpers, useFormik } from 'formik';
import styled from 'styled-components';
import { addProductSchema } from '../schemas/addProduct';

export interface ProductFormData {
  name: string;
  price: string;
  cost: string;
}

export const initialValues = {
  name: '',
  price: '',
  cost: '',
};

interface AddProductProps {
  onSubmit: (
    data: ProductFormData,
    helpers: FormikHelpers<ProductFormData>,
  ) => void;
}

const AddProduct = ({ onSubmit }: AddProductProps) => {
  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: addProductSchema,
    initialValues,
    initialErrors: initialValues,
    onSubmit,
  });

  return (
    <AddProduct.FormWrapper onSubmit={formik.handleSubmit}>
      <InputField
        label="Product name"
        name="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={formik.errors.name}
        touched={Boolean(formik.touched.name)}
      />

      <InputField
        label="Product price"
        name="price"
        type="text"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={formik.errors.price}
        touched={Boolean(formik.touched.price)}
      />

      <InputField
        label="Product cost (not required)"
        name="cost"
        type="text"
        value={formik.values.cost}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={formik.errors.cost}
        touched={Boolean(formik.touched.cost)}
      />

      <Button
        type="submit"
        className="button"
        disabled={
          Boolean(formik.errors.name) ||
          Boolean(formik.errors.price) ||
          Boolean(formik.errors.cost) ||
          !Boolean(formik.values.name) ||
          !Boolean(formik.values.price)
        }
      >
        Add
      </Button>
    </AddProduct.FormWrapper>
  );
};

AddProduct.FormWrapper = styled.form`
  width: fit-content;
  display: flex;
  flex-direction: column;

  .button {
    margin-left: auto;
    height: 37px;
  }
`;

export default AddProduct;
