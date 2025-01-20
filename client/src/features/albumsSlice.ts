import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IAlbum } from '@/interfaces/IAlbum';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
	albums?: IAlbum[];
	error?: Error;
	loading: boolean;
}

const initialState: State = {
	loading: false,
};

export const fetchAlbumsOfArtist = createAsyncThunk(
	'fetch/albums_of_artist',
	async (payload: string) => {
		const { data } = await axiosApiClient.get<IAlbum[]>('/albums', {
			params: {
				artist: payload,
			},
		});
		return data;
	},
);

const albumsSlice = createSlice({
	name: 'albums',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAlbumsOfArtist.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(fetchAlbumsOfArtist.fulfilled, (state, action) => {
				state.albums = action.payload;
				state.loading = false;
			})
			.addCase(fetchAlbumsOfArtist.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			});
	},
});

export const albumsReducer = albumsSlice.reducer;
