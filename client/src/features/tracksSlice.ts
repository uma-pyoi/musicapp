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
		const { data } = await axiosApiClient.get<ITrack[]>(`/tracks`, {
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

const tracksSlice = createSlice({
	name: 'artists',
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
			});
	},
});

export const tracksReducer = tracksSlice.reducer;
