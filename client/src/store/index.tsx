import { artistsReducer } from '@/features/artistsSlice';
import { userReducer } from '@/features/userSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		artists: artistsReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
