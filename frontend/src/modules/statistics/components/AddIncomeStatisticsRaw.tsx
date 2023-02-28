import { Edit, Save } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import InputField from 'components/InputField';
import { FormikHelpers, useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { Product } from 'store/products/products.types';
import styled from 'styled-components';
import { IncomeStatisticsData } from 'store/incomeStatistics/incomeStatistics.types';
import { addIncomeStatisticsSchema } from '../schemas/addIncomeStatistics';

interface AddIncomeStatisticsRawProps {
  product: Product;
  data: IncomeStatisticsData;
  onEdit: (data: IncomeStatisticsData) => void;
}

interface AddIncomeStatisticsFormData {
  quantity: string;
}

const initialValues = { quantity: '' };

const AddIncomeStatisticsRaw = ({
  product,
  data,
  onEdit,
}: AddIncomeStatisticsRawProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const toggleEdit = () => setEditMode(prev => !prev);

  const onSubmit = useCallback(
    async (
      { quantity }: AddIncomeStatisticsFormData,
      helpers: FormikHelpers<AddIncomeStatisticsFormData>,
    ) => {
      onEdit({ ...data, creationDate: new Date(), quantity: Number(quantity) });

      helpers.setValues({ quantity: '' });
    },
    [data],
  );

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: addIncomeStatisticsSchema,
    initialValues,
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
    <AddIncomeStatisticsRaw.TableRow>
      <TableCell align="left">{product.name}</TableCell>
      <TableCell align="left">{product.price}</TableCell>
      <TableCell align="left">
        {editMode ? (
          <InputField
            label="Quantity"
            name="quantity"
            type="text"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorText={formik.errors.quantity}
            touched={Boolean(formik.touched.quantity)}
            width={150}
            className="input"
          />
        ) : (
          data.quantity || formik.values.quantity || 0
        )}
      </TableCell>
      <TableCell align="left">
        {product.price * (data.quantity || Number(formik.values.quantity) || 0)}
      </TableCell>
      <TableCell align="left" sx={{ width: 20 }}>
        <IconButton onClick={onEditClick}>
          {editMode ? <Save /> : <Edit />}
        </IconButton>
      </TableCell>
    </AddIncomeStatisticsRaw.TableRow>
  );
};

AddIncomeStatisticsRaw.TableRow = styled(TableRow)`
  position: relative;

  .input {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default AddIncomeStatisticsRaw;
