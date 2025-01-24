'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { Alert, Grid2, Typography } from '@mui/material';
import { fetchAlbum } from '@/features/albumsSlice';
import { fetchTracksOfAlbum } from '@/features/tracksSlice';
import { TracksList } from './TracksList/TracksList';
import CheckIcon from '@mui/icons-material/Check';
import { fetchArtist } from '@/features/artistsSlice';
import { IAlbum } from '@/interfaces/IAlbum';

interface Props {
	albumId: string;
}

export function TracksPage({ albumId }: Props) {
	const dispatch = useAppDispatch();
	const { tracks } = useAppSelector((state) => state.tracks);
	const { currAlbum } = useAppSelector((state) => state.albums);
	const { currArtist } = useAppSelector((state) => state.artists);
	const { sentTrackHistory } = useAppSelector((state) => state.track_history);

	const [showSuccessAlert, setShowSuccessAlert] = useState(false);

	useEffect(() => {
		const fetchDataFunc = async () => {
			const albumResponse = await dispatch(fetchAlbum(albumId));
			const album = albumResponse.payload as IAlbum;
			if (album.artistId) {
				await dispatch(fetchArtist(album.artistId));
			}
			await dispatch(fetchTracksOfAlbum(albumId));
		};
		fetchDataFunc();
	}, [dispatch, albumId]);

	useEffect(() => {
		if (sentTrackHistory) {
			setShowSuccessAlert(true);
			setTimeout(() => setShowSuccessAlert(false), 5000);
		}
	}, [sentTrackHistory]);

	if (currArtist && currAlbum && tracks && tracks[0]) {
		return (
			<>
				{showSuccessAlert ? (
					<Alert icon={<CheckIcon fontSize='inherit' />} severity='success'>
						Track is in your Track History now.
					</Alert>
				) : null}

				<Grid2 container>
					<Typography variant='h5'>{currArtist.name}</Typography>
				</Grid2>
				<Grid2 container>
					<Typography variant='h5'>{currAlbum.title}</Typography>
				</Grid2>
				<TracksList tracksArr={tracks} />
			</>
		);
	}

	return (
		<Grid2 container justifyContent={'center'}>
			<Typography variant='body2' sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
				No Tracks were found...
			</Typography>
		</Grid2>
	);
}
