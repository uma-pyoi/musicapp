import { ITrackHistory } from '@/interfaces/ITrackHistory';
import { Box, Card, CardContent, CardHeader, Grid2, Typography } from '@mui/material';

interface Props {
	trackHistory: ITrackHistory;
}

export function TrackHistoriesListItem({ trackHistory }: Props) {
	const { datetime, artist, track } = trackHistory;

	return (
		<Grid2 component='div' m={2}>
			<Card>
				<Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
					<Grid2 container sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
						<Grid2 container direction={'column'}>
							<CardHeader sx={{ wordBreak: 'break-all' }} title={track.title} />
							<CardContent>
								<Typography variant='h6'>{artist.name}</Typography>
								<Typography variant='body2' sx={{ color: 'text.secondary' }}>
									{datetime}
								</Typography>
							</CardContent>
						</Grid2>
					</Grid2>
				</Box>
			</Card>
		</Grid2>
	);
}
