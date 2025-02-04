import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IArtist } from '@/interfaces/IArtist';
import { IResponseError } from '@/interfaces/IResponseError';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface State {
	artists?: IArtist[];
	currArtist?: IArtist;
	error?: Error;
	loading: boolean;
}

const initialState: State = {
	loading: false,
};

export const fetchArtists = createAsyncThunk('fetch/artists', async () => {
	const { data } = await axiosApiClient.get<IArtist[]>('/artists');
	return data;
});

export const fetchPublishedArtists = createAsyncThunk('fetch_published/artists', async () => {
	const { data } = await axiosApiClient.get<IArtist[]>(`/artists/published`);
	return data;
});

export const fetchArtist = createAsyncThunk('fetch/artist', async (payload: string) => {
	const { data } = await axiosApiClient.get<IArtist>(`/artists/${payload}/published`);
	return data;
});

export const createArtist = createAsyncThunk('create/artist', async (payload: FormData) => {
	const { data } = await axiosApiClient.post('/artists', payload);
	return data;
});

export const deleteArtist = createAsyncThunk(
	'delete/artist',
	async (payload: string, { rejectWithValue }) => {
		try {
			const { data } = await axiosApiClient.delete(`/artists/${payload}`);
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

export const publishArtist = createAsyncThunk('publish/artist', async (payload: string) => {
	const { data } = await axiosApiClient.post(`/artists/${payload}/publish`);
	return data;
});

export const artistsSlice = createSlice({
	name: 'artists',
	initialState,
	reducers: {
		resetArtists: (state) => {
			state.artists = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArtists.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(fetchArtists.fulfilled, (state, action) => {
				state.artists = action.payload;
				state.loading = false;
			})
			.addCase(fetchArtists.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			})

			.addCase(fetchArtist.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(fetchArtist.fulfilled, (state, action) => {
				state.currArtist = action.payload;
				state.loading = false;
			})
			.addCase(fetchArtist.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			})

			.addCase(createArtist.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(createArtist.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(createArtist.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			})

			.addCase(deleteArtist.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(deleteArtist.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(deleteArtist.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			})

			.addCase(publishArtist.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(publishArtist.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(publishArtist.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			})

			.addCase(fetchPublishedArtists.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(fetchPublishedArtists.fulfilled, (state, action) => {
				state.artists = action.payload;
				state.loading = false;
			})
			.addCase(fetchPublishedArtists.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			});
	},
});

export const { resetArtists } = artistsSlice.actions;
export const artistsReducer = artistsSlice.reducer;
