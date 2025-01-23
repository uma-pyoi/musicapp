import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid2 } from '@mui/material';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface Props {
	isOpen: boolean;
	closeModal: () => void;
	type: 'register' | 'login';
}

export function AuthModal({ isOpen, closeModal, type }: Props) {
	return (
		<Modal
			open={isOpen}
			onClose={closeModal}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Grid2 sx={style}>
				<Typography id='modal-modal-title' variant='h6' component='h2' textAlign={'center'}>
					{type === 'register' ? 'Registration' : 'Log in'}
				</Typography>
				{type === 'register' ? <RegisterForm closeModal={closeModal} /> : <LoginForm closeModal={closeModal}/>}
			</Grid2>
		</Modal>
	);
}
