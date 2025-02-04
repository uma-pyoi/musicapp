import { Alert, Grid2, Typography } from '@mui/material';
import { ArtistsList } from '../ArtistsPage/ArtistsList/ArtistsList';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchArtists } from '@/features/artistsSlice';
import { fetchAlbums } from '@/features/albumsSlice';
import { AlbumsList } from '../AlbumsPage/AlbumsList/AlbumsList';
import { fetchTracks } from '@/features/tracksSlice';
import { TracksList } from '../TracksPage/TracksList/TracksList';

export function UnpublishedPage() {
	const dispatch = useAppDispatch();
	const artistsState = useAppSelector((state) => state.artists);
	const albumsState = useAppSelector((state) => state.albums);
	const tracksState = useAppSelector((state) => state.tracks);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (artistsState.error) {
			setError(artistsState.error.message);
		} else if (albumsState.error) {
			setError(albumsState.error.message);
		} else if (tracksState.error) {
			setError(tracksState.error.message);
		} else {
			setError(null);
		}
	}, [artistsState.error, albumsState.error, tracksState.error]);

	useEffect(() => {
		setError(null);

		async function fetchData() {
			await dispatch(fetchArtists());
			await dispatch(fetchAlbums());
			await dispatch(fetchTracks());
		}
		fetchData();
	}, [dispatch]);

	return (
		<Grid2 container direction={'column'}>
			{error ? (
				<Alert sx={{ position: 'fixed', left: '0', top: '0' }} severity='error'>
					{error}
				</Alert>
			) : null}
			<Grid2>
				<Typography variant='h4'>Unpublished:</Typography>
			</Grid2>
			<Grid2>
				<Typography variant='h5'>Artists</Typography>
			</Grid2>
			<Grid2>
				{artistsState.artists ? (
					<ArtistsList artistsArr={artistsState.artists} isUnpublished={true} />
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
				{albumsState.albums ? (
					<AlbumsList albumsArr={albumsState.albums} isUnpublished={true} />
				) : (
					<Typography variant='body2' sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
						No Albums were found...
					</Typography>
				)}
			</Grid2>

			<Grid2>
				<Typography variant='h5'>Tracks</Typography>
			</Grid2>
			<Grid2>
				{tracksState.tracks ? (
					<TracksList tracksArr={tracksState.tracks} isUnpublished={true} />
				) : (
					<Typography variant='body2' sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
						No Tracks were found...
					</Typography>
				)}
			</Grid2>
		</Grid2>
	);
}
