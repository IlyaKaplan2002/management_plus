import { createAsyncThunk } from '@reduxjs/toolkit';
import { CREATE, GET, StatisticsCreate } from './statistics.types';
import StatisticsAPI from 'api/statistics';
import { getStatisticsSortedByMonths } from './statistics.helpers';

export default class StatisticsActions {
  public static get = createAsyncThunk(
    GET,
    async (projectId: string, thunkAPI) => {
      const response = await StatisticsAPI.get(projectId);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const statistics = getStatisticsSortedByMonths(response.data.statistics);

      return thunkAPI.fulfillWithValue({ projectId, statistics });
    },
  );

  public static create = createAsyncThunk(
    CREATE,
    async (
      { projectId, data }: { projectId: string; data: StatisticsCreate },
      thunkAPI,
    ) => {
      const response = await StatisticsAPI.create({ projectId, data });

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue({
        projectId,
        statistics: response.data.statistics,
      });
    },
  );
}
