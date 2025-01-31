'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { Grid2, Typography } from '@mui/material';
import { fetchTrackHistories } from '@/features/trackHistorySlice';
import { TrackHistoriesList } from './TrackHitoriesList/TrackHistoriesList';
import { useRouter } from 'next/navigation';
import { withAuth } from '@/hoc/withAuth';

function TrackHistoriesPage() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { trackHistories } = useAppSelector((state) => state.track_history);
	const { user } = useAppSelector((state) => state.user);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fetchDataFunc = async () => {
			await dispatch(fetchTrackHistories());
			setLoaded(true);
		};
		fetchDataFunc();
	}, [dispatch, router, user?.token]);

	if (trackHistories && trackHistories[0] && loaded) {
		return (
			<>
				<Grid2 container>
					<Typography variant='h5'>Your Tracks History</Typography>
				</Grid2>
				<TrackHistoriesList trackHistoriesArr={trackHistories} />
			</>
		);
	}

	return (
		<Grid2 container justifyContent={'center'}>
			<Typography variant='body2' sx={{ color: 'text.secondary', wordBreak: 'break-all' }}>
				No Track Histories were found...
			</Typography>
		</Grid2>
	);
}

export default withAuth(TrackHistoriesPage);
