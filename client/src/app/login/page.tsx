'use client';

import { authFormStyle } from '@/components/Authorization/AuthModal';
import { LoginForm } from '@/components/Authorization/LoginForm';
import { useAppSelector } from '@/store/hooks';
import { Alert, Grid2, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect } from 'react';
import { useState } from 'react';

export default function LoginPage() {
	const { user } = useAppSelector((state) => state.user);

	const [showSuccessAlert, setShowSuccessAlert] = useState(false);

	useEffect(() => {
		if (user) {
			setShowSuccessAlert(true);
			setTimeout(() => setShowSuccessAlert(false), 5000);
		}
	}, [user]);

	return (
		<>
			{showSuccessAlert ? (
				<Alert icon={<CheckIcon fontSize='inherit' />} severity='success'>
					You are loggin in now.
				</Alert>
			) : null}

			<Grid2 sx={authFormStyle}>
				<Typography id='modal-modal-title' variant='h6' component='h2' textAlign={'center'}>
					Log in
				</Typography>
				<LoginForm closeModal={() => {}} />
			</Grid2>
		</>
	);
}
