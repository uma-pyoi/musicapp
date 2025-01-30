import { AppBar, Button, styled, Toolbar, Typography } from '@mui/material';
import { AuthModal } from '../Authorization/AuthModal';
import { StyledLink } from '../ArtistsPage/ArtistsList/ArtistsListItem/ArtistsListItem';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearLoginError, clearRegisterError } from '@/features/userSlice';
import { UserMenu } from './Menu/UserMenu';
import { GuestMenu } from './Menu/GuestMenu';

export const StyledButton = styled(Button)(() => ({
	color: 'white',
	textTransform: 'none',
	bgcolor: 'none',
}));

export function AppToolbar() {
	const { user } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	const closeRegister = () => {
		setIsRegisterOpen(false);
		dispatch(clearRegisterError());
	};

	const openRegister = () => {
		setIsRegisterOpen(true);
	};

	const closeLogin = () => {
		setIsLoginOpen(false);
		dispatch(clearLoginError());
	};

	const openLogin = () => {
		setIsLoginOpen(true);
	};

	return (
		<>
			<AuthModal type='register' isOpen={isRegisterOpen} closeModal={closeRegister} />
			<AuthModal type='login' isOpen={isLoginOpen} closeModal={closeLogin} />
			<AppBar position='fixed'>
				<Toolbar sx={{ gap: '16px', bgcolor: 'red' }}>
					<Typography variant='h6' component={StyledLink} href='/'>
						Musical App
					</Typography>
					{user ? <UserMenu /> : <GuestMenu openLogin={openLogin} openRegister={openRegister} />}
				</Toolbar>
			</AppBar>
		</>
	);
}
