import { Edit, Save } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import InputField from 'components/InputField';
import { FormikHelpers, useFormik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  normativePriceActions,
  normativePriceSelectors,
} from 'store/normativePrice';
import {
  plannedSellQuantityActions,
  plannedSellQuantitySelectors,
} from 'store/plannedSellQuantity';
import { Product } from 'store/products/products.types';
import styled from 'styled-components';
import { PlannedSellQuantity } from '../../../store/plannedSellQuantity/plannedSellQuantity.types';
import { NormativePrice } from '../../../store/normativePrice/normativePrice.types';
import { periodSchema } from '../schemas/periodSchema';
import { useAppDispatch } from 'store';
import { useParams } from 'react-router-dom';
import { IncomeStatistics } from 'store/incomeStatistics/incomeStatistics.types';
import { ManufacturedQuantityStatistics } from 'store/manufacturedQuantityStatistics/manufacturedQuantityStatistics.types';

interface ProductTableRawProps {
  product: Product;
  periodId: string;
  incomeStatistics: IncomeStatistics[];
  manufacturedStatistics: ManufacturedQuantityStatistics[];
}

interface PeriodFormData {
  normativePrice: string;
  plannedSellQuantity: string;
}

const PeriodTableRaw = ({
  product,
  periodId,
  incomeStatistics,
  manufacturedStatistics,
}: ProductTableRawProps) => {
  const { id: projectId } = useParams();

  const [editMode, setEditMode] = useState<boolean>(false);

  const toggleEdit = () => setEditMode(prev => !prev);

  const dispatch = useAppDispatch();

  const normativePrices = useSelector(
    normativePriceSelectors.getByPeriodIdAndProductId({
      periodId,
      productId: product.id,
    }),
  );

  const normativePriceExists = useMemo(
    () => Object.keys(normativePrices).length > 0,
    [normativePrices],
  );

  const normativePrice: NormativePrice | null = useMemo(
    () =>
      normativePriceExists
        ? normativePrices[Object.keys(normativePrices)[0]]
        : null,
    [normativePrices, normativePriceExists],
  );

  const plannedSellQuantities = useSelector(
    plannedSellQuantitySelectors.getByPeriodIdAndProductId({
      periodId,
      productId: product.id,
    }),
  );

  const plannedSellQuantityExists = useMemo(
    () => Object.keys(plannedSellQuantities).length > 0,
    [plannedSellQuantities],
  );

  const plannedSellQuantity: PlannedSellQuantity | null = useMemo(
    () =>
      plannedSellQuantityExists
        ? plannedSellQuantities[Object.keys(plannedSellQuantities)[0]]
        : null,
    [plannedSellQuantities, plannedSellQuantityExists],
  );

  const totalSoldQuantity = useMemo(
    () =>
      incomeStatistics.reduce((acc, item) => acc + Number(item.quantity), 0),
    [incomeStatistics],
  );

  const totalManufacturedQuantity = useMemo(
    () =>
      manufacturedStatistics.reduce(
        (acc, item) => acc + Number(item.quantity),
        0,
      ),
    [manufacturedStatistics],
  );

  const onSubmit = useCallback(
    async (
      {
        normativePrice: newNormativePrice,
        plannedSellQuantity: newPlannedSellQuantity,
      }: PeriodFormData,
      helpers: FormikHelpers<PeriodFormData>,
    ) => {
      if (!projectId) return;

      if (normativePrice) {
        await dispatch(
          normativePriceActions.update({
            projectId,
            periodId,
            normativePriceId: normativePrice.id,
            normativePrice: { price: Number(newNormativePrice) },
          }),
        );
      } else {
        await dispatch(
          normativePriceActions.create({
            projectId,
            periodId,
            normativePrice: {
              price: Number(newNormativePrice),
              productId: product.id,
            },
          }),
        );
      }

      if (plannedSellQuantity) {
        await dispatch(
          plannedSellQuantityActions.update({
            projectId,
            periodId,
            plannedSellQuantityId: plannedSellQuantity.id,
            plannedSellQuantity: { quantity: Number(newPlannedSellQuantity) },
          }),
        );
      } else {
        await dispatch(
          plannedSellQuantityActions.create({
            projectId,
            periodId,
            plannedSellQuantity: {
              quantity: Number(newPlannedSellQuantity),
              productId: product.id,
            },
          }),
        );
      }

      helpers.setValues({
        normativePrice: newNormativePrice,
        plannedSellQuantity: newPlannedSellQuantity,
      });
    },
    [
      dispatch,
      normativePrice,
      plannedSellQuantity,
      projectId,
      periodId,
      product,
    ],
  );

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: periodSchema,
    initialValues: {
      normativePrice: String(normativePrice?.price || 0),
      plannedSellQuantity: String(plannedSellQuantity?.quantity || 0),
    },
    initialErrors: { plannedSellQuantity: '', normativePrice: '' },
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
    <PeriodTableRaw.TableRow>
      <TableCell align="left">{product.name}</TableCell>
      <TableCell align="left">{totalSoldQuantity}</TableCell>
      <TableCell align="left">{totalManufacturedQuantity}</TableCell>
      <TableCell align="left">
        {editMode ? (
          <InputField
            label="Normative price"
            name="normativePrice"
            type="text"
            value={formik.values.normativePrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorText={formik.errors.normativePrice}
            touched={Boolean(formik.touched.normativePrice)}
            width={150}
            className="input"
          />
        ) : (
          normativePrice?.price || 0
        )}
      </TableCell>
      <TableCell align="left">
        {editMode ? (
          <InputField
            label="Planned sales volume"
            name="plannedSellQuantity"
            type="text"
            value={formik.values.plannedSellQuantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorText={formik.errors.plannedSellQuantity}
            touched={Boolean(formik.touched.plannedSellQuantity)}
            width={150}
            className="input"
          />
        ) : (
          plannedSellQuantity?.quantity || 0
        )}
      </TableCell>
      <TableCell align="left" sx={{ width: 20 }}>
        <IconButton onClick={onEditClick}>
          {editMode ? <Save /> : <Edit />}
        </IconButton>
      </TableCell>
    </PeriodTableRaw.TableRow>
  );
};

PeriodTableRaw.TableRow = styled(TableRow)`
  position: relative;

  .input {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default PeriodTableRaw;
