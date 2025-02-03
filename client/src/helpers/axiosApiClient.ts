import { RootState } from '@/store';
import { Store } from '@reduxjs/toolkit';
import axios from 'axios';

type AppStore = Store<RootState>;
let store: AppStore;
export function injectStore(_store: AppStore) {
	store = _store;
}

export const axiosApiClient = axios.create({
	baseURL: process.env.SERVER_URL,
});

axiosApiClient.interceptors.request.use((config) => {
	try {
		if (store) {
			config.headers['Authorization'] = store.getState().user.user?.token;
		}
	} catch {}

	return config;
});
