'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Alert, Box, Button, Grid2, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FileInput } from '../FileInput/FileInput';
import { createArtist } from '@/features/artistsSlice';
import CheckIcon from '@mui/icons-material/Check';

interface NewArtistState {
	name: string;
	info: string;
}

export function ArtistForm() {
	const dispatch = useAppDispatch();
	const { error } = useAppSelector((state) => state.artists);
	const [artist, setArtist] = useState<NewArtistState>({
		name: '',
		info: '',
	});
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);

	const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData: FormData = new FormData();
		for (const [key, value] of Object.entries(artist)) {
			if (typeof value === 'object') {
				formData.append(key, value);
			} else {
				if (`${value}`.trim().length === 0) {
					console.log('THE VALUE IS EMPTY!');
					return;
				}
				formData.append(key, `${value}`);
			}
		}

		async function handleCreation() {
			await dispatch(createArtist(formData));
			if (!error) {
				setShowSuccessAlert(true);
				setTimeout(() => setShowSuccessAlert(false), 5000);
			}
		}
		handleCreation();

		console.log('formData !!!!!!!!!!!!!!!!! ', formData);
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setArtist((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files?.[0]) {
			const name = e.target.name;
			const file: File = e.target.files[0];
			setArtist((prevState) => {
				return { ...prevState, [name]: file };
			});
		}
	};

	return (
		<>
			{showSuccessAlert ? (
				<Alert icon={<CheckIcon fontSize='inherit' />} severity='success'>
					The artist was created.
				</Alert>
			) : null}
			<Box component={'form'} autoComplete='off' onSubmit={submitFormHandler} paddingY={2}>
				<Grid2 container direction={'column'} spacing={2}>
					<Grid2>
						<TextField
							fullWidth
							variant='outlined'
							id='name'
							label='name'
							value={artist.name}
							name='name'
							onChange={inputChangeHandler}
						/>
					</Grid2>
					<Grid2>
						<TextField
							fullWidth
							variant='outlined'
							id='info'
							label='info'
							value={artist.info}
							name='info'
							onChange={inputChangeHandler}
						/>
					</Grid2>
					<Grid2>
						<FileInput label='Image' name='image' onChange={fileChangeHandler} />
					</Grid2>
					<Grid2>
						<Button type='submit' variant='contained'>
							CREATE
						</Button>
					</Grid2>
				</Grid2>
			</Box>
		</>
	);
}
