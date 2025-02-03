'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
	Alert,
	Box,
	Button,
	Grid2,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FileInput } from '../FileInput/FileInput';
import CheckIcon from '@mui/icons-material/Check';
import { fetchArtists } from '@/features/artistsSlice';
import { createAlbum } from '@/features/albumsSlice';

interface NewAlbumState {
	title: string;
	releaseYear: string;
	artistId: string;
	image?: File;
}

export function AlbumForm() {
	const dispatch = useAppDispatch();
	const { artists } = useAppSelector((state) => state.artists);
	const { error } = useAppSelector((state) => state.albums);
	const [isMounted, setIsMounted] = useState(false);
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);
	const [album, setAlbum] = useState<NewAlbumState>({
		title: '',
		releaseYear: '',
		artistId: '',
	});

	useEffect(() => {
		dispatch(fetchArtists());
		setIsMounted(true);
	}, [dispatch]);

	const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData: FormData = new FormData();
		for (const [key, value] of Object.entries(album)) {
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
			await dispatch(createAlbum(formData));
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
		setAlbum((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const selectChangeHandler = (e: SelectChangeEvent<string>) => {
		const { name, value } = e.target;
		console.log('select chnage handler = ', name, value);
		setAlbum((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files?.[0]) {
			const name = e.target.name;
			const file: File = e.target.files[0];
			setAlbum((prevState) => {
				return { ...prevState, [name]: file };
			});
		}
	};

	if (!isMounted) return null;

	return (
		<>
			{showSuccessAlert ? (
				<Alert icon={<CheckIcon fontSize='inherit' />} severity='success'>
					The album was created.
				</Alert>
			) : null}
			<Box component={'form'} autoComplete='off' onSubmit={submitFormHandler} paddingY={2}>
				<Grid2 container direction={'column'} spacing={2}>
					<Grid2>
						<TextField
							fullWidth
							variant='outlined'
							id='title'
							label='Title'
							value={album.title}
							name='title'
							onChange={inputChangeHandler}
						/>
					</Grid2>
					<Grid2>
						<TextField
							fullWidth
							variant='outlined'
							id='releaseYear'
							label='releaseYear'
							value={album.releaseYear}
							name='releaseYear'
							onChange={inputChangeHandler}
						/>
					</Grid2>
					<Grid2>
						<InputLabel id='artistId-label'>Artist</InputLabel>
						<Select
							labelId='artistId-label'
							id='artistId'
							name='artistId'
							value={album.artistId}
							label='Artist'
							onChange={selectChangeHandler}
						>
							{artists
								? artists.map((artist) => (
										<MenuItem value={artist.id} key={artist.id}>
											{artist.name}
										</MenuItem>
								  ))
								: null}
						</Select>
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
