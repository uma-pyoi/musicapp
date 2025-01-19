import { axiosApiClient } from "@/helpers/axiosApiClient";
import { IProduct } from "@/interfaces/IProduct";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface State {
  products: IProduct[];
  error?: Error;
  loading: boolean;
}

const initialState: State = {
  loading: false,
  products: [],
};

export const fetchProducts = createAsyncThunk("fetch/products", async () => {
  const { data } = await axiosApiClient.get<IProduct[]>("/products");
  return data;
});

export const createProduct = createAsyncThunk(
  "create/product",
  async (payload: FormData) => {
    const { data } = await axiosApiClient.post("/products", payload);
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error as Error;
        state.loading = false;
      });
  },
});

export const productsReducer = productsSlice.reducer;
