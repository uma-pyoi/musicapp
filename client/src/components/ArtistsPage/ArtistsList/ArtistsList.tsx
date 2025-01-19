import { IArtist } from '@/interfaces/IArtist';
import { Grid2 } from '@mui/material';
import { ArtistsListItem } from './ArtistsListItem/ArtistsListItem';

interface Props {
	artistsArr: IArtist[];
}

export function ArtistsList({ artistsArr }: Props) {
	return (
		<Grid2>
			{artistsArr.map((artist) => (
				<ArtistsListItem key={artist.id} artist={artist} />
			))}
		</Grid2>
	);
}
