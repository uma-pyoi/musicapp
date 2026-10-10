// todo: add roles later

// 'use client';

// import { Role } from '@/interfaces/IUser';
// import { useAppSelector } from '@/store/hooks';
// import { Alert, CircularProgress } from '@mui/material';
// import { redirect } from 'next/navigation';
// import React, { useEffect } from 'react';

// export const withAuth = (WrappedComponent: React.ElementType, role: Role) => {
// 	return function WithAuth(props: object) {
// 		const { user, loading } = useAppSelector((state) => state.user);

// 		const isAccessed = (): boolean => {
// 			if (user?.role === role) {
// 				return true;
// 			} else if (role === Role.User) {
// 				if (user?.role === Role.Admin) {
// 					return true;
// 				}
// 			}
// 			return false;
// 		};

// 		useEffect(() => {
// 			if (!user && !loading) {
// 				redirect('/login');
// 			}
// 		}, [user, loading]);

// 		if (loading) {
// 			<CircularProgress />;
// 		}

// 		return loading ? (
// 			<CircularProgress />
// 		) : isAccessed() ? (
// 			<WrappedComponent {...props} />
// 		) : (
// 			<>
// 				<Alert severity='error'>You don't have enough rights.</Alert>
// 			</>
// 		);
// 	};
// };
