import { Button } from '@mui/material';
import InputField from 'components/InputField';
import { FormikHelpers, useFormik } from 'formik';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { otherIncomeStatisticsActions } from 'store/otherIncomeStatistics';
import { periodsSelectors } from 'store/periods';
import styled from 'styled-components';
import { addOtherIncomeStatisticsSchema } from '../schemas/addOtherIncomeStatistics';

export interface OtherIncomeFormData {
  income: string;
}

export const initialValues = {
  income: '',
};

const AddOtherIncomeStatistics = () => {
  const { id: projectId } = useParams();

  const dispatch = useAppDispatch();

  const currentPeriod = useSelector(
    periodsSelectors.getCurrentPeriod(projectId || ''),
  );

  const onSubmit = useCallback(
    async (
      data: OtherIncomeFormData,
      helpers: FormikHelpers<OtherIncomeFormData>,
    ) => {
      if (!projectId || !currentPeriod || !currentPeriod.id) return;

      await dispatch(
        otherIncomeStatisticsActions.create({
          projectId,
          periodId: currentPeriod.id,
          otherIncomeStatistics: {
            income: Number(data.income),
            creationDate: new Date(),
          },
        }),
      );

      helpers.resetForm();
    },
    [projectId, currentPeriod, dispatch],
  );

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: addOtherIncomeStatisticsSchema,
    initialValues,
    initialErrors: initialValues,
    onSubmit,
  });

  return (
    <AddOtherIncomeStatistics.FormWrapper onSubmit={formik.handleSubmit}>
      <InputField
        label="Income amount"
        name="income"
        type="text"
        value={formik.values.income}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={formik.errors.income}
        touched={Boolean(formik.touched.income)}
        className="input"
      />

      <Button
        type="submit"
        className="button"
        disabled={
          Boolean(formik.errors.income) || !Boolean(formik.values.income)
        }
      >
        Add
      </Button>
    </AddOtherIncomeStatistics.FormWrapper>
  );
};

AddOtherIncomeStatistics.FormWrapper = styled.form`
  width: fit-content;
  display: flex;
  flex-direction: column;

  .button {
    margin-left: auto;
    height: 37px;
  }
`;

export default AddOtherIncomeStatistics;
