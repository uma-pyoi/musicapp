import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IUser } from '@/interfaces/IUser';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface UserState {
	user?: IUser;
	loading?: boolean;
	error?: string;
}

export interface UserRequest {
	username: string;
	password: string;
	displayName?: string;
}

interface UserResponseError {
	message: string;
	error: string;
	statusCode: number;
}

export const registerUser = createAsyncThunk<IUser, UserRequest>(
	'auth/register',
	async (userData, { rejectWithValue }) => {
		try {
			const { data } = await axiosApiClient.post<IUser>('user/register', userData);
			return data;
		} catch (err) {
			if (err instanceof AxiosError) {
				if (err.response?.data) {
					const errorResponse: UserResponseError = err.response.data;
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
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				if (typeof action.payload === 'string') {
					state.error = action.payload;
				} else {
					state.error = 'Something went wrong';
				}
				state.loading = false;
			});
	},
});

export const userReducer = userSlice.reducer;
