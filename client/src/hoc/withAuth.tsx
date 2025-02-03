'use client';

import { useAppSelector } from '@/store/hooks';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

export const withAuth = (WrappedComponent: React.ElementType) => {
	return function WithAuth(props: object) {
		const { user, loading } = useAppSelector((state) => state.user);

		useEffect(() => {
			if (!user && !loading) {
				redirect('/login');
			}
		}, [user, loading]);

		return <WrappedComponent {...props} />;
	};
};
