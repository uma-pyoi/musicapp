import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IAlbum } from '@/interfaces/IAlbum';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
	albums?: IAlbum[];
	currAlbum?: IAlbum;
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

export const fetchAlbum = createAsyncThunk('fetch/album', async (payload: string) => {
	const { data } = await axiosApiClient.get<IAlbum>(`/albums/${payload}`);
	return data;
});

export const fetchAlbums = createAsyncThunk('fetch/albums', async () => {
	const { data } = await axiosApiClient.get<IAlbum[]>(`/albums`);
	return data;
});

export const createAlbum = createAsyncThunk('create/album', async (payload: FormData) => {
	const { data } = await axiosApiClient.post('/albums', payload);
	return data;
});

export const deleteAlbum = createAsyncThunk('delete/album', async (payload: string) => {
	const { data } = await axiosApiClient.delete(`/albums/${payload}`);
	return data;
});

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
			})

			.addCase(fetchAlbum.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(fetchAlbum.fulfilled, (state, action) => {
				state.currAlbum = action.payload;
				state.loading = false;
			})
			.addCase(fetchAlbum.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			})

			.addCase(createAlbum.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(createAlbum.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(createAlbum.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			})

			.addCase(fetchAlbums.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(fetchAlbums.fulfilled, (state, action) => {
				state.albums = action.payload;
				state.loading = false;
			})
			.addCase(fetchAlbums.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			});
	},
});

export const albumsReducer = albumsSlice.reducer;
