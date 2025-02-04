import { createTrackHistory } from '@/features/trackHistorySlice';
import { ITrack } from '@/interfaces/ITrack';
import { useAppDispatch } from '@/store/hooks';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Grid2,
	IconButton,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteTrack, fetchTracks, publishTrack } from '@/features/tracksSlice';

interface Props {
	track: ITrack;
	isUnpublished: boolean;
}

export function TracksListItem({ track, isUnpublished }: Props) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { title, trackNumber, duration, id } = track;

	const titleClick = async () => {
		const trackHistoryCreation = await dispatch(createTrackHistory({ trackId: `${id}` }));

		if (trackHistoryCreation.payload === 'Please log in first. You will be redirected now.') {
			router.push('/login');
		}
	};

	const handlePublish = () => {
		dispatch(publishTrack(id));
	};

	const handleDelete = async () => {
		await dispatch(deleteTrack(id));
		await dispatch(fetchTracks());
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
								onClick={isUnpublished ? null : titleClick}
							/>
							<CardContent>
								<Typography variant='h6'>{trackNumber}</Typography>

								<Typography variant='body2' sx={{ color: 'text.secondary' }}>
									{duration}
								</Typography>

								{isUnpublished ? (
									<>
										<Button onClick={handlePublish}>Publish</Button>
										<IconButton onClick={handleDelete}>
											<DeleteOutlineIcon />
										</IconButton>
									</>
								) : null}
							</CardContent>
						</Grid2>
					</Grid2>
				</Box>
			</Card>
		</Grid2>
	);
}
