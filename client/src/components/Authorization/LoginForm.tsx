import { loginUser, UserRequest } from '@/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Alert, Box, Button, Grid2, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
	closeModal: () => void;
}

export function LoginForm({ closeModal }: Props) {
	const { loginError } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const [user, setUser] = useState<UserRequest>({
		username: '',
		password: '',
	});

	const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		for (const property in user) {
			if (user[property as keyof UserRequest].trim().length <= 0) {
				return;
			}
		}
		dispatch(loginUser(user));
		closeModal();
		console.log('user !!!!!!!!!!!!!!!!! ', user);
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser((prevState) => {
			return { ...prevState, [name]: value.trim() };
		});
	};

	return (
		<>
			{loginError ? <Alert severity='error'>{loginError}</Alert> : null}
			<Box component={'form'} autoComplete='off' onSubmit={submitFormHandler} paddingY={2}>
				<Grid2 container direction={'column'} alignItems={'center'} spacing={2}>
					<Grid2>
						<TextField
							fullWidth
							variant='outlined'
							id='username'
							label='Username'
							value={user.username}
							name='username'
							required
							onChange={inputChangeHandler}
						/>
					</Grid2>
					<Grid2>
						<TextField
							fullWidth
							variant='outlined'
							id='password'
							label='Password'
							value={user.password}
							name='password'
							required
							onChange={inputChangeHandler}
						/>
					</Grid2>
					<Grid2>
						<Button type='submit' variant='contained'>
							Login
						</Button>
					</Grid2>
				</Grid2>
			</Box>
		</>
	);
}
