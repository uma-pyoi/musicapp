import { Grid2, Typography } from '@mui/material';
import { ArtistsList } from '../ArtistsPage/ArtistsList/ArtistsList';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchArtists } from '@/features/artistsSlice';
import { fetchAlbums } from '@/features/albumsSlice';
import { AlbumsList } from '../AlbumsPage/AlbumsList/AlbumsList';

export function UnpublishedPage() {
	const dispatch = useAppDispatch();
	const { artists } = useAppSelector((state) => state.artists);
	const { albums } = useAppSelector((state) => state.albums);
	useEffect(() => {
		async function fetchData() {
			await dispatch(fetchArtists());
			await dispatch(fetchAlbums());
		}
		fetchData();
	}, [dispatch]);

	return (
		<Grid2 container direction={'column'}>
			<Grid2>
				<Typography variant='h4'>Unpublished:</Typography>
			</Grid2>
			<Grid2>
				<Typography variant='h5'>Artists</Typography>
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

			<Grid2>
				<Typography variant='h5'>Albums</Typography>
			</Grid2>
			<Grid2>
				{albums ? (
					<AlbumsList albumsArr={albums} isUnpublished={true} />
				) : (
					<Typography variant='body2' sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
						No Albums were found...
					</Typography>
				)}
			</Grid2>
		</Grid2>
	);
}
