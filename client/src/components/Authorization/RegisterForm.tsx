import { IUser } from '@/interfaces/IUser';
import { useAppDispatch } from '@/store/hooks';
import { Box, Button, Grid2, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
	btnText: string;
}

export function RegisterForm({ btnText }: Props) {
	const dispatch = useAppDispatch();
	// const router = useRouter();
	const [user, setUser] = useState<Omit<IUser, 'id'>>({
		username: '',
		password: '',
	});

	const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData: FormData = new FormData();
		Object.entries(user).forEach(([key, value]) => {
			if (typeof value === 'object') {
				formData.append(key, value);
			} else {
				formData.append(key, `${value}`);
			}
		});

		// dispatch(createProduct(formData));
		// router.push('/');
		console.log('formData !!!!!!!!!!!!!!!!! ', formData);
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	return (
		<Box component={'form'} autoComplete='off' onSubmit={submitFormHandler} paddingY={2}>
			<Grid2 container direction={'column'} spacing={2}>
				<Grid2>
					<TextField
						fullWidth
						variant='outlined'
						id='username'
						label='Username'
						value={user.username}
						name='username'
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
						onChange={inputChangeHandler}
					/>
				</Grid2>
				<Grid2>
					<Button type='submit' variant='contained'>
						{btnText}
					</Button>
				</Grid2>
			</Grid2>
		</Box>
	);
}
