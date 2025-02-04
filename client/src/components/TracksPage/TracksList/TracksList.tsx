import { Grid2 } from '@mui/material';
import { ITrack } from '@/interfaces/ITrack';
import { TracksListItem } from './TracksListItem/TracksListItem';

interface Props {
	tracksArr: ITrack[];
	isUnpublished: boolean;
}

export function TracksList({ tracksArr, isUnpublished }: Props) {
	return (
		<Grid2>
			{tracksArr.map((track) => (
				<TracksListItem key={track.id} track={track} isUnpublished={isUnpublished} />
			))}
		</Grid2>
	);
}
