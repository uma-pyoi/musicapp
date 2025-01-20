import { Grid2 } from '@mui/material';
import { ITrack } from '@/interfaces/ITrack';
import { TracksListItem } from './TracksListItem/TracksListItem';

interface Props {
	tracksArr: ITrack[];
}

export function TracksList({ tracksArr }: Props) {
	return (
		<Grid2>
			{tracksArr.map((track) => (
				<TracksListItem key={track.id} track={track} />
			))}
		</Grid2>
	);
}
