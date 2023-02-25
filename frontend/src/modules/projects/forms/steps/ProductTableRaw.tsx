import { Delete, Edit, Save } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import InputField from 'components/InputField';
import { FormikHelpers, useFormik } from 'formik';
import { secondStepSchema } from 'modules/projects/schemas/secondStep';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ProductData, initialValues, ProductFormData } from './SecondStep';

interface ProductTableRawProps {
  product: ProductData;
  onDelete: (id: string) => void;
  onEdit: (data: ProductData) => void;
}

const ProductTableRaw = ({
  product,
  onDelete,
  onEdit,
}: ProductTableRawProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const toggleEdit = () => setEditMode(prev => !prev);

  const onSubmit = useCallback(
    (
      { name, price, cost }: ProductFormData,
      helpers: FormikHelpers<ProductFormData>,
    ) => {
      onEdit({
        tempId: product.tempId,
        name,
        price: Number(price),
        cost: Number(cost),
      });
      helpers.resetForm();
    },
    [],
  );
  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: secondStepSchema,
    initialValues: {
      name: product.name,
      price: String(product.price),
      cost: String(product.cost),
    },
    initialErrors: initialValues,
    onSubmit,
  });

  const onEditClick = useCallback(() => {
    if (editMode) {
      toggleEdit();
      formik.handleSubmit();
    } else {
      toggleEdit();
    }
  }, [formik.handleSubmit, toggleEdit]);

  return (
    <ProductTableRaw.TableRow>
      <TableCell align="left">
        {editMode ? (
          <InputField
            label="Product name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorText={formik.errors.name}
            touched={Boolean(formik.touched.name)}
            width={150}
            className="input"
          />
        ) : (
          product.name
        )}
      </TableCell>
      <TableCell align="left">
        {editMode ? (
          <InputField
            label="Product price"
            name="price"
            type="text"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorText={formik.errors.price}
            touched={Boolean(formik.touched.price)}
            width={150}
            className="input"
          />
        ) : (
          product.price
        )}
      </TableCell>
      <TableCell align="left">
        {editMode ? (
          <InputField
            label="Product cost (not required)"
            name="cost"
            type="text"
            value={formik.values.cost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorText={formik.errors.cost}
            touched={Boolean(formik.touched.cost)}
            width={150}
            className="input"
          />
        ) : (
          product.cost
        )}
      </TableCell>
      <TableCell align="left" sx={{ width: 20 }}>
        <IconButton onClick={onEditClick}>
          {editMode ? <Save /> : <Edit />}
        </IconButton>
      </TableCell>
      <TableCell align="left" sx={{ width: 20 }}>
        <IconButton onClick={() => onDelete(product.tempId)}>
          <Delete />
        </IconButton>
      </TableCell>
    </ProductTableRaw.TableRow>
  );
};

ProductTableRaw.TableRow = styled(TableRow)`
  position: relative;

  .input {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default ProductTableRaw;
