import { Grid2 } from '@mui/material';
import { AlbumsListItem } from './AlbumsListItem/AlbumsListItem';
import { IAlbum } from '@/interfaces/IAlbum';

interface Props {
	albumsArr: IAlbum[];
}

export function AlbumsList({ albumsArr }: Props) {
	return (
		<Grid2>
			{albumsArr.map((album) => (
				<AlbumsListItem key={album.id} album={album} />
			))}
		</Grid2>
	);
}
