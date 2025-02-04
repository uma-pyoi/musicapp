import { Grid2, Typography } from '@mui/material';
import { ArtistsList } from '../ArtistsPage/ArtistsList/ArtistsList';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchArtists } from '@/features/artistsSlice';

export function UnpublishedPage() {
	const dispatch = useAppDispatch();
	const { artists } = useAppSelector((state) => state.artists);
	useEffect(() => {
		async function fetchData() {
			await dispatch(fetchArtists());
			// await dispatch(fetchAlbums()); // add
		}
		fetchData();
	}, [dispatch]);

	return (
		<Grid2 container direction={'column'}>
			<Grid2>
				<Typography variant='h5'>Unpublished:</Typography>
			</Grid2>
			<Grid2>
				<Typography variant='h6'>Artists</Typography>
			</Grid2>
			<Grid2>
				{artists ? (
					<ArtistsList artistsArr={artists} isUnpublished={true} />
				) : (
					<Typography variant='body2' sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
						No Artists were found...
					</Typography>
				)}
			</Grid2>
		</Grid2>
	);
}
