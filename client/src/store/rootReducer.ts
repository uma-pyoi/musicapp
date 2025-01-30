import { albumsReducer } from '@/features/albumsSlice';
import { artistsReducer } from '@/features/artistsSlice';
import { trackHistoryReducer } from '@/features/trackHistorySlice';
import { tracksReducer } from '@/features/tracksSlice';
import { userReducer } from '@/features/userSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
	artists: artistsReducer,
	albums: albumsReducer,
	tracks: tracksReducer,
	user: userReducer,
	track_history: trackHistoryReducer,
});
