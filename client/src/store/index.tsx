import { albumsReducer } from '@/features/albumsSlice';
import { artistsReducer } from '@/features/artistsSlice';
import { trackHistoryReducer } from '@/features/trackHistorySlice';
import { tracksReducer } from '@/features/tracksSlice';
import { userReducer } from '@/features/userSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		artists: artistsReducer,
		albums: albumsReducer,
		tracks: tracksReducer,
		user: userReducer,
		track_history: trackHistoryReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
