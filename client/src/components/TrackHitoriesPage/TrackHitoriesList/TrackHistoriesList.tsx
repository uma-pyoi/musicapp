import { Grid2 } from '@mui/material';
import { ITrackHistory } from '@/interfaces/ITrackHistory';
import { TrackHistoriesListItem } from './TrackHitoriesListItem/TrackHistoriesListItem';

interface Props {
	trackHistoriesArr: ITrackHistory[];
}

export function TrackHistoriesList({ trackHistoriesArr }: Props) {
	return (
		<Grid2>
			{trackHistoriesArr.map((trackHistory) => (
				<TrackHistoriesListItem key={trackHistory.id} trackHistory={trackHistory} />
			))}
		</Grid2>
	);
}
