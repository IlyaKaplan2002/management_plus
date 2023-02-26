import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductsAPI from 'api/products';
import {
  CREATE,
  CREATE_MANY,
  DELETE,
  GET,
  ProductCreate,
  UPDATE,
} from './products.types';

export default class ProductsActions {
  public static get = createAsyncThunk(
    GET,
    async (projectId: string, thunkAPI) => {
      const response = await ProductsAPI.get(projectId);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      const { products } = response.data;

      return thunkAPI.fulfillWithValue(products);
    },
  );

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

  public static update = createAsyncThunk(
    UPDATE,
    async (
      data: { projectId: string; product: ProductCreate; productId: string },
      thunkAPI,
    ) => {
      const response = await ProductsAPI.update(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(response.data.product);
    },
  );

  public static delete = createAsyncThunk(
    DELETE,
    async (data: { projectId: string; productId: string }, thunkAPI) => {
      const response = await ProductsAPI.delete(data);

      if (response.status === 'failed') {
        return thunkAPI.rejectWithValue(response.message);
      }

      return thunkAPI.fulfillWithValue(data);
    },
  );
}
