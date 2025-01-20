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

const artistsSlice = createSlice({
	name: 'artists',
	initialState,
	reducers: {
		setCurrArtist(state, action) {
			state.currArtist = action.payload;
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
			});
	},
});

export const { setCurrArtist } = artistsSlice.actions;
export const artistsReducer = artistsSlice.reducer;
