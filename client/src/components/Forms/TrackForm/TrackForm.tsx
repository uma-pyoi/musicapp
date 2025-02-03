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
import CheckIcon from '@mui/icons-material/Check';
import { fetchArtists } from '@/features/artistsSlice';
import { fetchAlbumsOfArtist } from '@/features/albumsSlice';
import { createTrack } from '@/features/tracksSlice';

export interface NewTrackState {
	title: string;
	duration: string;
	albumId: string;
	trackNumber: string;
}

export interface FinalTrackState {
	title: string;
	duration: string;
	albumId: string;
	trackNumber: number;
}

export function TrackForm() {
	const dispatch = useAppDispatch();
	const { artists } = useAppSelector((state) => state.artists);
	const { albums } = useAppSelector((state) => state.albums);
	const { error } = useAppSelector((state) => state.tracks);
	const [isMounted, setIsMounted] = useState(false);
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);
	const [track, setTrack] = useState<NewTrackState>({
		title: '',
		duration: '',
		albumId: '',
		trackNumber: '',
	});

	const [artistId, setArtistId] = useState('');

	useEffect(() => {
		dispatch(fetchArtists());
		setIsMounted(true);
	}, [dispatch]);

	const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		for (const [value] of Object.entries(track)) {
			if (typeof value !== 'object') {
				if (`${value}`.trim().length === 0) {
					return;
				}
			}
		}

		const finalTrack: FinalTrackState = {
			...track,
			trackNumber: parseInt(track.trackNumber),
		};

		async function handleCreation() {
			await dispatch(createTrack(finalTrack));
			if (!error) {
				setShowSuccessAlert(true);
				setTimeout(() => setShowSuccessAlert(false), 5000);
			}
		}
		handleCreation();
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setTrack((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const selectChangeHandler = (e: SelectChangeEvent<string>) => {
		const { name, value } = e.target;
		setTrack((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const artistSelectHandler = async (e: SelectChangeEvent<string>) => {
		setArtistId(e.target.value);
		await dispatch(fetchAlbumsOfArtist(e.target.value));
	};

	if (!isMounted) return null;

	return (
		<>
			{showSuccessAlert ? (
				<Alert icon={<CheckIcon fontSize='inherit' />} severity='success'>
					The track was created.
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
							value={track.title}
							name='title'
							onChange={inputChangeHandler}
						/>
					</Grid2>
					<Grid2>
						<TextField
							fullWidth
							variant='outlined'
							id='duration'
							label='Duration'
							value={track.duration}
							name='duration'
							onChange={inputChangeHandler}
						/>
					</Grid2>
					<Grid2>
						<TextField
							fullWidth
							variant='outlined'
							id='trackNumber'
							name='trackNumber'
							label='Track Number'
							type='number'
							onChange={inputChangeHandler}
							slotProps={{
								inputLabel: {
									shrink: true,
								},
							}}
						/>
					</Grid2>
					<Grid2>
						<InputLabel id='artistId-label'>Artist</InputLabel>
						<Select
							labelId='artistId-label'
							id='artistId'
							name='artistId'
							value={artistId}
							label='Artist'
							onChange={artistSelectHandler}
						>
							<MenuItem value='' disabled>
								Choose an artist
							</MenuItem>
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
						<InputLabel id='albumId-label'>Album</InputLabel>
						<Select
							labelId='albumId-label'
							id='albumId'
							name='albumId'
							value={track.albumId}
							label='Album'
							onChange={selectChangeHandler}
						>
							<MenuItem value='' disabled>
								Choose an album
							</MenuItem>
							{albums
								? albums.map((album) => (
										<MenuItem value={`${album.id}`} key={album.id}>
											{album.title}
										</MenuItem>
								  ))
								: null}
						</Select>
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
