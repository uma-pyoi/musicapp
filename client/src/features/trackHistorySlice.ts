import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IResponseError } from '@/interfaces/IResponseError';
import { ITrackHistory } from '@/interfaces/ITrackHistory';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface State {
	trackHistories?: ITrackHistory[];
	sentTrackHistory: boolean;
	loginError?: string;
	fetchError?: string;
	loading: boolean;
}

const initialState: State = {
	loading: false,
	sentTrackHistory: false,
};

interface IGetState {
	user: {
		user?: { token: string };
	};
}

export const createTrackHistory = createAsyncThunk(
	'create/track_history',
	async (payload: { trackId: string }, { rejectWithValue, getState }) => {
		const state = getState() as IGetState;
		const token = state.user.user?.token;

		if (!token) {
			return rejectWithValue('Please log in first. You will be redirected now.');
		}

		if (token) {
			try {
				const { data } = await axiosApiClient.post(`/track-history`, payload, {
					headers: {
						Authorization: token,
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

export const fetchTrackHistories = createAsyncThunk(
	'fetch/track-histories',
	async (__, { getState, rejectWithValue }) => {
		const state = getState() as IGetState;
		const token = state.user.user?.token;
		try {
			const { data } = await axiosApiClient.get<ITrackHistory[]>('/track-history', {
				headers: {
					Authorization: token,
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
				state.loginError = undefined;
			})
			.addCase(createTrackHistory.fulfilled, (state) => {
				state.sentTrackHistory = true;
				state.loading = false;
			})
			.addCase(createTrackHistory.rejected, (state, action) => {
				if (typeof action.payload === 'string') {
					state.loginError = action.payload;
				} else {
					state.loginError = 'Something went wrong';
				}
				state.loading = false;
			})

			.addCase(fetchTrackHistories.pending, (state) => {
				state.loading = true;
				state.fetchError = undefined;
			})
			.addCase(fetchTrackHistories.fulfilled, (state, action) => {
				state.trackHistories = action.payload;
				state.loading = false;
			})
			.addCase(fetchTrackHistories.rejected, (state, action) => {
				if (typeof action.payload === 'string') {
					state.fetchError = action.payload;
				} else {
					state.fetchError = 'Something went wrong';
				}
				state.loading = false;
			});
	},
});

export const { falseSentTrackHistory } = trackHistorySlice.actions;
export const trackHistoryReducer = trackHistorySlice.reducer;
