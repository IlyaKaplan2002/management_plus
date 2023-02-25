import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import InputField from 'components/InputField';
import { FormikHelpers, useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { ProductCreate } from 'store/products/products.types';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { secondStepSchema } from '../../schemas/secondStep';
import ProductTableRaw from './ProductTableRaw';

export interface ProductData {
  tempId: string;
  name: string;
  price: number;
  cost: number;
}

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

interface SecondStepProps {
  onCreate: (value: ProductCreate[]) => void;
}

const SecondStep = ({ onCreate }: SecondStepProps) => {
  const [data, setData] = useState<ProductData[]>([]);

  const onSubmit = useCallback(
    (
      { name, price, cost }: ProductFormData,
      helpers: FormikHelpers<ProductFormData>,
    ) => {
      setData(prev => [
        ...prev,
        { tempId: uuid(), name, price: Number(price), cost: Number(cost) },
      ]);
      helpers.resetForm();
    },
    [],
  );

  const onDelete = useCallback((id: string) => {
    setData(prev => [...prev.filter(item => item.tempId !== id)]);
  }, []);

  const onEdit = useCallback((data: ProductData) => {
    setData(prev =>
      prev.map(item => {
        if (item.tempId === data.tempId) {
          return { ...data };
        }
        return item;
      }),
    );
  }, []);

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: secondStepSchema,
    initialValues,
    initialErrors: initialValues,
    onSubmit,
  });

  const onNextClick = useCallback(() => {
    onCreate(
      data.map(item => ({
        name: item.name,
        price: item.price,
        cost: item.cost,
      })),
    );
  }, [data, onCreate]);

  return (
    <SecondStep.Wrapper>
      <SecondStep.FormWrapper onSubmit={formik.handleSubmit}>
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
      </SecondStep.FormWrapper>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Cost</TableCell>
              <TableCell align="left" sx={{ width: 20 }} />
              <TableCell align="left" sx={{ width: 20 }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(product => {
              return (
                <ProductTableRaw
                  key={product.tempId}
                  product={product}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        type="button"
        className="button"
        onClick={onNextClick}
        disabled={data.length === 0}
      >
        Next
      </Button>
    </SecondStep.Wrapper>
  );
};

SecondStep.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 130px;

  .button {
    margin-left: auto;
    height: 37px;
  }
`;

SecondStep.FormWrapper = styled.form`
  width: fit-content;
  display: flex;
  flex-direction: column;
`;

export default SecondStep;
