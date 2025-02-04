import { Grid2 } from '@mui/material';
import { AlbumsListItem } from './AlbumsListItem/AlbumsListItem';
import { IAlbum } from '@/interfaces/IAlbum';

interface Props {
	albumsArr: IAlbum[];
	isUnpublished: boolean;
}

export function AlbumsList({ albumsArr, isUnpublished }: Props) {
	return (
		<Grid2>
			{albumsArr.map((album) => (
				<AlbumsListItem key={album.id} album={album} isUnpublished={isUnpublished} />
			))}
		</Grid2>
	);
}
