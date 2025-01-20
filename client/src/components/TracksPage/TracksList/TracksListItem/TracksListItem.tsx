import { ITrack } from '@/interfaces/ITrack';
import { Box, Card, CardContent, CardHeader, Grid2, Typography } from '@mui/material';

interface Props {
	track: ITrack;
}

export function TracksListItem({ track }: Props) {
	const { title, trackNumber, duration } = track;

	return (
		<Grid2 component='div' m={2}>
			<Card>
				<Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
					<Grid2 container sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
						<Grid2 container direction={'column'}>
							<CardHeader
								sx={{ wordBreak: 'break-all' }}
								title={title}
								component={Typography}
								variant='h6'
							/>
							<CardContent>
								<Typography variant='h6'>{trackNumber}</Typography>

								<Typography variant='body2' sx={{ color: 'text.secondary' }}>
									{duration}
								</Typography>
							</CardContent>
						</Grid2>
					</Grid2>
				</Box>
			</Card>
		</Grid2>
	);
}
