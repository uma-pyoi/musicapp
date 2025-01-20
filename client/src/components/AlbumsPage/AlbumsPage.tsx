'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { Grid2, Typography } from '@mui/material';
import { fetchAlbumsOfArtist } from '@/features/albumsSlice';
import { AlbumsList } from './AlbumsList/AlbumsList';

interface Props {
	artistId: string;
}

export function AlbumsPage({ artistId }: Props) {
	const dispatch = useAppDispatch();
	const { albums } = useAppSelector((state) => state.albums);
	const { currArtist } = useAppSelector((state) => state.artists);

	useEffect(() => {
		console.log('albums useEffect');
		const fetchAlbumsFunc = async () => {
			await dispatch(fetchAlbumsOfArtist(artistId));
		};
		// if (!albums) {
		fetchAlbumsFunc();
		// }

		// console.log(albums);
	}, [dispatch, artistId]);

	// if (albums && albums[0]) {
	// 	return <AlbumsList albumsArr={albums} />;
	// }

	return (
		<>
			<Grid2 container>
				<Typography variant='h5'>{currArtist?.name}</Typography>
			</Grid2>
			<Grid2 container justifyContent={'center'}>
				<Typography variant='body2' sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
					No Albums of {} were found...
				</Typography>
			</Grid2>
		</>
	);
}
