'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { Grid2, Typography } from '@mui/material';
import { fetchAlbum } from '@/features/albumsSlice';
import { fetchTracksOfAlbum } from '@/features/tracksSlice';
import { TracksList } from './TracksList/TracksList';

interface Props {
	albumId: string;
}

export function TracksPage({ albumId }: Props) {
	const dispatch = useAppDispatch();
	const { tracks } = useAppSelector((state) => state.tracks);
	const { currAlbum } = useAppSelector((state) => state.albums);
	const { currArtist } = useAppSelector((state) => state.artists);

	useEffect(() => {
		const fetchDataFunc = async () => {
			await dispatch(fetchAlbum(albumId));
			await dispatch(fetchTracksOfAlbum(albumId));
		};
		fetchDataFunc();
	}, [dispatch, albumId]);

	if (currArtist && currAlbum && tracks && tracks[0]) {
		return (
			<>
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
