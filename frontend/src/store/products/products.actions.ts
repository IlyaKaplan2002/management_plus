import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductsAPI from 'api/products';
import { CREATE, CREATE_MANY, GET, ProductCreate } from './products.types';

export default class ProjectsActions {
  public static get = createAsyncThunk(GET, async (projectId, thunkAPI) => {
    const response = await ProductsAPI.get(projectId);

    if (response.status === 'failed') {
      return thunkAPI.rejectWithValue(response.message);
    }

    const { products } = response.data;

    return thunkAPI.fulfillWithValue(products);
  });

  public static create = createAsyncThunk(
    CREATE,
    async (data: { projectId: string; product: ProductCreate }, thunkAPI) => {
      const response = await ProductsAPI.create(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.product);
    },
  );

  public static createMany = createAsyncThunk(
    CREATE_MANY,
    async (
      data: { projectId: string; products: ProductCreate[] },
      thunkAPI,
    ) => {
      const response = await ProductsAPI.createMany(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.products);
    },
  );
}
