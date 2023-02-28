import { Button } from '@mui/material';
import InputField from 'components/InputField';
import SelectField from 'components/SelectField';
import { FormikHelpers, useFormik } from 'formik';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { costsCategoriesSelectors } from 'store/costsCategories';
import { costsStatisticsActions } from 'store/costsStatistics';
import { periodsSelectors } from 'store/periods';
import styled from 'styled-components';
import { addcostsStatisticsSchema } from '../schemas/addCostsStatistics';

export interface CostsStatisticsFormData {
  category: string;
  costs: string;
}

export const initialValues = {
  category: '',
  costs: '',
};

const AddCostsStatistics = () => {
  const { id: projectId } = useParams();

  const dispatch = useAppDispatch();

  const currentPeriod = useSelector(
    periodsSelectors.getCurrentPeriod(projectId || ''),
  );

  const costsCategories = useSelector(
    costsCategoriesSelectors.getByProjectId(projectId || ''),
  );

  const costsCategoriesOptions = useMemo(
    () =>
      Object.values(costsCategories).map(item => ({
        value: item.id,
        label: item.name,
      })),
    [costsCategories],
  );

  const onSubmit = useCallback(
    async (
      data: CostsStatisticsFormData,
      helpers: FormikHelpers<CostsStatisticsFormData>,
    ) => {
      if (!projectId || !currentPeriod || !currentPeriod.id) return;

      await dispatch(
        costsStatisticsActions.create({
          projectId,
          periodId: currentPeriod.id,
          costsStatistics: {
            costs: Number(data.costs),
            costsCategoryId: data.category,
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
    validationSchema: addcostsStatisticsSchema,
    initialValues,
    initialErrors: initialValues,
    onSubmit,
  });

  return (
    <AddCostsStatistics.FormWrapper onSubmit={formik.handleSubmit}>
      <SelectField
        label="Category"
        name="category"
        value={formik.values.category}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={formik.errors.category}
        touched={Boolean(formik.touched.category)}
        options={costsCategoriesOptions}
      />

      <InputField
        label="Costs amount"
        name="costs"
        type="text"
        value={formik.values.costs}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorText={formik.errors.costs}
        touched={Boolean(formik.touched.costs)}
      />

      <Button
        type="submit"
        className="button"
        disabled={
          Boolean(formik.errors.costs) ||
          Boolean(formik.errors.category) ||
          !Boolean(formik.values.category) ||
          !Boolean(formik.values.costs)
        }
      >
        Add
      </Button>
    </AddCostsStatistics.FormWrapper>
  );
};

AddCostsStatistics.FormWrapper = styled.form`
  width: fit-content;
  display: flex;
  flex-direction: column;

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

export default AddCostsStatistics;
