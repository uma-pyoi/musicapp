import { Button, Toolbar } from '@mui/material';

interface Props {
	openRegister: () => void;
	openLogin: () => void;
}

export function GuestMenu({ openRegister, openLogin }: Props) {
	return (
		<Toolbar>
			<Button
				sx={{ color: 'white', textTransform: 'none', bgcolor: 'none' }}
				onClick={openRegister}
			>
				Register
			</Button>

			<Button sx={{ color: 'white', textTransform: 'none', bgcolor: 'none' }} onClick={openLogin}>
				Login
			</Button>
		</Toolbar>
	);
}
