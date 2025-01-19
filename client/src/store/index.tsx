import { productsReducer } from '@/features/productsSlice';
import { userReducer } from '@/features/userSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		products: productsReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
