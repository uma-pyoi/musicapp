'use client';

import { fetchPublishedArtists, resetArtists } from '@/features/artistsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { ArtistsList } from './ArtistsList/ArtistsList';
import { Grid2, Typography } from '@mui/material';

export function ArtistsPage() {
	const dispatch = useAppDispatch();
	const { artists } = useAppSelector((state) => state.artists);

	useEffect(() => {
		dispatch(resetArtists());
	}, [dispatch]);

	useEffect(() => {
		const fetchArtistsFunc = async () => {
			await dispatch(fetchPublishedArtists());
		};
		if (!artists) {
			fetchArtistsFunc();
		}
	}, [dispatch, artists]);

	if (artists) {
		return <ArtistsList artistsArr={artists} isUnpublished={false} />;
	}

	return (
		<Grid2 container justifyContent={'center'}>
			<Typography variant='body2' sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
				No Artists were found...
			</Typography>
		</Grid2>
	);
}
