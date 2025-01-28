import { Toolbar, Typography } from '@mui/material';
import { StyledLink } from '../../ArtistsPage/ArtistsList/ArtistsListItem/ArtistsListItem';
import { useAppDispatch } from '@/store/hooks';

export function UserMenu() {
	const dispatch = useAppDispatch();

	const logoutHandler = () => {
		// dispatch(logoutUser());
		console.log('logout');
	};

	return (
		<Toolbar sx={{ gap: 2 }}>
			<Typography component={StyledLink} href='/track-history'>
				Track History
			</Typography>
			<Typography onClick={logoutHandler}>Logout</Typography>
		</Toolbar>
	);
}
