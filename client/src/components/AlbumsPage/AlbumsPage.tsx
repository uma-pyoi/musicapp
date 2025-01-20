'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { Grid2, Typography } from '@mui/material';
import { fetchAlbumsOfArtist } from '@/features/albumsSlice';
import { AlbumsList } from './AlbumsList/AlbumsList';
import { fetchArtist } from '@/features/artistsSlice';

interface Props {
	artistId: string;
}

export function AlbumsPage({ artistId }: Props) {
	const dispatch = useAppDispatch();
	const { albums } = useAppSelector((state) => state.albums);
	const { currArtist } = useAppSelector((state) => state.artists);

	useEffect(() => {
		const fetchDataFunc = async () => {
			await dispatch(fetchArtist(artistId));
			await dispatch(fetchAlbumsOfArtist(artistId));
		};
		fetchDataFunc();
	}, [dispatch, artistId]);

	if (currArtist && albums && albums[0]) {
		return (
			<>
				<Grid2 container>
					<Typography variant='h5'>{currArtist.name}</Typography>
				</Grid2>
				<AlbumsList albumsArr={albums} />
			</>
		);
	}

	return (
		<Grid2 container justifyContent={'center'}>
			<Typography variant='body2' sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
				No Albums were found...
			</Typography>
		</Grid2>
	);
}
