import { AppBar, Button, styled, Toolbar, Typography } from '@mui/material';
import { AuthModal } from '../Authorization/AuthModal';
import { StyledLink } from '../ArtistsPage/ArtistsList/ArtistsListItem/ArtistsListItem';
import { useState } from 'react';

export const StyledButton = styled(Button)(() => ({
	color: 'white',
	textTransform: 'none',
	bgcolor: 'none',
}));

export function AppToolbar() {
	// const [guestItems] =
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	// const [modalType, setModalType] = useState<'register' | 'login' | null>(null);

	// const openModal = () => {
	// 	if (modalType === 'register') {
	// 		setIsRegisterOpen(true);
	// 	} else {
	// 		setIsLoginOpen(true);
	// 	}
	// };

	// const closeModal = () => {
	// 	if (modalType === 'register') {
	// 		setIsRegisterOpen(false);
	// 	} else {
	// 		setIsLoginOpen(false);
	// 	}
	// };

	const closeRegister = () => {
		setIsRegisterOpen(false);
	};

	const openRegister = () => {
		setIsRegisterOpen(true);
	};

	const closeLogin = () => {
		setIsLoginOpen(false);
	};

	const openLogin = () => {
		setIsLoginOpen(true);
	};

	return (
		<>
			{/* {modalType === 'register' ? ( */}
			<AuthModal type='register' isOpen={isRegisterOpen} closeModal={closeRegister} />
			<AuthModal type='login' isOpen={isLoginOpen} closeModal={closeLogin} />
			<AppBar position='fixed'>
				<Toolbar sx={{ gap: '16px', bgcolor: 'red' }}>
					<Typography variant='h6' component={StyledLink} href='/'>
						Musical App
					</Typography>
					<Button
						sx={{ color: 'white', textTransform: 'none', bgcolor: 'none' }}
						onClick={openRegister}
					>
						Register
					</Button>

					<Button
						sx={{ color: 'white', textTransform: 'none', bgcolor: 'none' }}
						onClick={openLogin}
					>
						Login
					</Button>
				</Toolbar>
			</AppBar>
		</>
	);
}
