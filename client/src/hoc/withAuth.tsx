'use client';

import { useAppSelector } from '@/store/hooks';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

export const withAuth = (WrappedComponent: React.ElementType) => {
	return function WithAuth(props: object) {
		const { user } = useAppSelector((state) => state.user);

		useEffect(() => {
			if (!user?.token) {
				redirect('/login');
			}
		});

		return <WrappedComponent {...props} />;
	};
};
