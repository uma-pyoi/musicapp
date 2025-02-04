import { FinalTrackState } from '@/components/Forms/TrackForm/TrackForm';
import { axiosApiClient } from '@/helpers/axiosApiClient';
import { ITrack } from '@/interfaces/ITrack';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
	tracks?: ITrack[];
	error?: Error;
	loading: boolean;
}

const initialState: State = {
	loading: false,
};

export const fetchTracksOfAlbum = createAsyncThunk(
	'fetch/tracks_of_album',
	async (payload: string) => {
		const { data } = await axiosApiClient.get<ITrack[]>(`/tracks/published`, {
			params: {
				album: payload,
			},
		});
		return data;
	},
);

export const createTrack = createAsyncThunk('create/track', async (payload: FinalTrackState) => {
	const { data } = await axiosApiClient.post('/tracks', payload);
	return data;
});

export const fetchTracks = createAsyncThunk('fetch/tracks', async () => {
	const { data } = await axiosApiClient.get<ITrack[]>(`/tracks`);
	return data;
});

export const fetchPublishedTracks = createAsyncThunk('fetch_published/tracks', async () => {
	const { data } = await axiosApiClient.get<ITrack[]>(`/tracks/published`);
	return data;
});

export const deleteTrack = createAsyncThunk('delete/track', async (payload: string) => {
	const { data } = await axiosApiClient.delete(`/tracks/${payload}`);
	return data;
});

export const publishTrack = createAsyncThunk('publish/track', async (payload: string) => {
	const { data } = await axiosApiClient.post(`/tracks/${payload}/publish`);
	return data;
});

const tracksSlice = createSlice({
	name: 'tracks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTracksOfAlbum.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(fetchTracksOfAlbum.fulfilled, (state, action) => {
				state.tracks = action.payload;
				state.loading = false;
			})
			.addCase(fetchTracksOfAlbum.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			})

			.addCase(createTrack.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(createTrack.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(createTrack.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			})

			.addCase(fetchTracks.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(fetchTracks.fulfilled, (state, action) => {
				state.tracks = action.payload;
				state.loading = false;
			})
			.addCase(fetchTracks.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			})

			.addCase(fetchPublishedTracks.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(fetchPublishedTracks.fulfilled, (state, action) => {
				state.tracks = action.payload;
				state.loading = false;
			})
			.addCase(fetchPublishedTracks.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			})

			.addCase(deleteTrack.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(deleteTrack.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(deleteTrack.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			})

			.addCase(publishTrack.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(publishTrack.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(publishTrack.rejected, (state, action) => {
				state.error = action.error as Error;
				state.loading = false;
			});
	},
});

export const tracksReducer = tracksSlice.reducer;
