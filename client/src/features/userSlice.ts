import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IResponseError } from '@/interfaces/IResponseError';
import { IUser } from '@/interfaces/IUser';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface UserState {
	user?: IUser;
	loading?: boolean;
	registerError?: string;
	loginError?: string;
}

export interface UserRequest {
	username: string;
	password: string;
}

export const registerUser = createAsyncThunk<IUser, UserRequest>(
	'user/register',
	async (userData, { rejectWithValue }) => {
		try {
			const { data } = await axiosApiClient.post<IUser>('/users', userData);
			return data;
		} catch (err) {
			if (err instanceof AxiosError) {
				if (err.response?.data) {
					const errorResponse: IResponseError = err.response.data;
					return rejectWithValue(errorResponse.message);
				}
				return rejectWithValue('An error occured');
			}
			throw err;
		}
	},
);

export const loginUser = createAsyncThunk<IUser, UserRequest>(
	'user/login',
	async (userData, { rejectWithValue }) => {
		try {
			const { data } = await axiosApiClient.post<IUser>('/users/sessions', userData);
			return data;
		} catch (err) {
			if (err instanceof AxiosError) {
				if (err.response?.data) {
					const errorResponse: IResponseError = err.response.data;
					return rejectWithValue(errorResponse.message);
				}
				return rejectWithValue('An error occured');
			}
			throw err;
		}
	},
);

const initialState: UserState = {
	loading: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearLoginError(state) {
			state.loginError = undefined;
		},
		clearRegisterError(state) {
			state.registerError = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.registerError = undefined;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				if (typeof action.payload === 'string') {
					state.registerError = action.payload;
				} else {
					state.registerError = 'Something went wrong';
				}
				state.loading = false;
			})

			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.loginError = undefined;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(loginUser.rejected, (state, action) => {
				if (typeof action.payload === 'string') {
					state.loginError = action.payload;
				} else {
					state.loginError = 'Something went wrong';
				}
				state.loading = false;
			});
	},
});

export const { clearLoginError, clearRegisterError } = userSlice.actions;
export const userReducer = userSlice.reducer;
