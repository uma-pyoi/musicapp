import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IArtist } from '@/interfaces/IArtist';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const fetchArtist = createAsyncThunk('fetch/artist', async (payload: string) => {
	const { data } = await axiosApiClient.get<IArtist>(`/artists/${payload}`);
	return data;
});

export const createArtist = createAsyncThunk('create/artist', async (payload: FormData) => {
	const { data } = await axiosApiClient.post('/artists', payload);
	return data;
});

const artistsSlice = createSlice({
	name: 'artists',
	initialState,
	reducers: {},
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
			});
	},
});

export const artistsReducer = artistsSlice.reducer;
