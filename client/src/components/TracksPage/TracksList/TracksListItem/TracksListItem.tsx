import { createTrackHistory } from '@/features/trackHistorySlice';
import { ITrack } from '@/interfaces/ITrack';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Card, CardContent, CardHeader, Grid2, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Props {
	track: ITrack;
}

export function TracksListItem({ track }: Props) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { title, trackNumber, duration, id } = track;
	// const { error } = useAppSelector((state) => state.track_history);

	const titleClick = async () => {
		console.log('click, id = ', id);
		// await dispatch(createTrackHistory({ trackId: `${id}` }));
		// if (error === 'Please log in first') {
		// 	router.push('/login');
		// }

		const trackHistoryCreation = await dispatch(createTrackHistory({ trackId: `${id}` }));

		if (trackHistoryCreation.payload === 'Please log in first') {
			router.push('/login');
		}
	};

	return (
		<Grid2 component='div' m={2}>
			<Card>
				<Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
					<Grid2 container sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
						<Grid2 container direction={'column'}>
							<CardHeader
								sx={{ wordBreak: 'break-all', cursor: 'pointer' }}
								title={title}
								component={Typography}
								variant='h6'
								onClick={titleClick}
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
