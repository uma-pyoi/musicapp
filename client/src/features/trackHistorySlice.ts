import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IResponseError } from '@/interfaces/IResponseError';
import { ITrackHistory } from '@/interfaces/ITrackHistory';
import { useAppSelector } from '@/store/hooks';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface State {
	trackHistories?: ITrackHistory[];
	sentTrackHistory: boolean;
	error?: string;
	loading: boolean;
}

const initialState: State = {
	loading: false,
	sentTrackHistory: false,
};

export const createTrackHistory = createAsyncThunk(
	'create/track_history',
	async (payload: string, { rejectWithValue }) => {
		const { user } = useAppSelector((state) => state.user);
		if (user?.token) {
			try {
				const { data } = await axiosApiClient.post(`/track_history`, payload, {
					headers: {
						Authorization: user.token,
					},
				});
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
		}
	},
);

const trackHistorySlice = createSlice({
	name: 'track_history',
	initialState,
	reducers: {
		falseSentTrackHistory(state) {
			state.sentTrackHistory = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTrackHistory.pending, (state) => {
				state.loading = true;
				state.sentTrackHistory = false;
				state.error = undefined;
			})
			.addCase(createTrackHistory.fulfilled, (state) => {
				state.sentTrackHistory = true;
				state.loading = false;
			})
			.addCase(createTrackHistory.rejected, (state, action) => {
				if (typeof action.payload === 'string') {
					state.error = action.payload;
				} else {
					state.error = 'Something went wrong';
				}
				state.loading = false;
			});
	},
});

export const { falseSentTrackHistory } = trackHistorySlice.actions;
export const trackHistoryReducer = trackHistorySlice.reducer;
