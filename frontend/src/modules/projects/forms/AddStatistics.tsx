import React, { useCallback, useMemo } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { addStatistics } from '../schemas/addStatistics';
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@mui/material';
import dayjs from 'dayjs';
import {
  StatisticsCreate,
  StatisticsStore,
} from 'store/statistics/statistics.types';

const initialErrors = {
  date: '',
  costs: '',
  incomes: '',
};

interface AddStatisticsProps {
  handleSubmit: (data: StatisticsCreate) => void;
  statistics?: StatisticsStore;
}

const AddStatistics = ({ handleSubmit, statistics }: AddStatisticsProps) => {
  const initialValues = useMemo(
    () => ({
      date: dayjs(statistics?.date || new Date()).format('YYYY-MM-DD'),
      costs: statistics?.costs || 0,
      incomes: statistics?.incomes || 0,
    }),
    [statistics],
  );

  const onSubmit = useCallback(
    (data: {
      date: string;
      costs: string | number;
      incomes: string | number;
    }) => {
      handleSubmit({
        costs: Number(data.costs),
        incomes: Number(data.incomes),
        date: new Date(data.date),
      });
    },
    [handleSubmit],
  );

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    initialErrors,
    validationSchema: addStatistics,
    onSubmit,
  });

  return (
    <AddStatistics.Container onSubmit={formik.handleSubmit}>
      <FormControl className="formItem">
        <InputLabel>Date</InputLabel>
        <Input
          type="date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.date) && Boolean(formik.touched.date)}
        />
        {Boolean(formik.errors.date) && formik.touched.date && (
          <FormHelperText className="error">Invalid date</FormHelperText>
        )}
      </FormControl>

      <FormControl className="formItem">
        <InputLabel>Costs</InputLabel>
        <Input
          type="text"
          name="costs"
          value={formik.values.costs}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.costs) && Boolean(formik.touched.costs)}
        />
        {Boolean(formik.errors.costs) && formik.touched.costs && (
          <FormHelperText className="error">
            {formik.errors.costs}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl className="formItem">
        <InputLabel>Incomes</InputLabel>
        <Input
          type="text"
          name="incomes"
          value={formik.values.incomes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            Boolean(formik.errors.incomes) && Boolean(formik.touched.incomes)
          }
        />
        {Boolean(formik.errors.incomes) && formik.touched.incomes && (
          <FormHelperText className="error">
            {formik.errors.incomes}
          </FormHelperText>
        )}
      </FormControl>

      <Button
        type="submit"
        className="button"
        disabled={
          Boolean(formik.errors.date) ||
          Boolean(formik.errors.costs) ||
          Boolean(formik.errors.incomes) ||
          !Boolean(formik.values.date) ||
          (!Boolean(formik.values.costs) && formik.values.costs !== 0) ||
          (!Boolean(formik.values.incomes) && formik.values.incomes !== 0)
        }
      >
        Add
      </Button>
    </AddStatistics.Container>
  );
};

AddStatistics.Container = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  .formItem {
    margin-bottom: 30px;
    width: 100%;
  }

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

export default AddStatistics;
