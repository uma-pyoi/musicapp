'use client';

import { useAppDispatch } from '@/store/hooks';
import { Box, Button, Grid2, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FileInput } from '../FileInput/FileInput';
import { createArtist } from '@/features/artistsSlice';

interface NewArtistState {
	name: string;
	info: string;
}

export function ArtistsForm() {
	const dispatch = useAppDispatch();
	const [artist, setArtist] = useState<NewArtistState>({
		name: '',
		info: '',
	});

	const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData: FormData = new FormData();
		Object.entries(artist).forEach(([key, value]) => {
			if (typeof value === 'object') {
				formData.append(key, value);
			} else {
				if (value.trim().length === 0) {
					return;
				}
				formData.append(key, `${value}`);
			}
		});

		dispatch(createArtist(formData));
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
	);
}
