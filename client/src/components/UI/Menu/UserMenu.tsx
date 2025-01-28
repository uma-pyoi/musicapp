import { styled, Toolbar, Typography } from '@mui/material';
import { StyledLink } from '../../ArtistsPage/ArtistsList/ArtistsListItem/ArtistsListItem';
import { useAppDispatch } from '@/store/hooks';
import { logoutUser } from '@/features/userSlice';

export const CursorPointer = styled(Typography)(() => ({
	'&:hover': {
		cursor: 'pointer',
	},
}));

export function UserMenu() {
	const dispatch = useAppDispatch();

	const logoutHandler = () => {
		dispatch(logoutUser());
	};

	return (
		<Toolbar sx={{ gap: 2 }}>
			<Typography component={StyledLink} href='/track-history'>
				Track History
			</Typography>
			<Typography component={CursorPointer} onClick={logoutHandler}>
				Logout
			</Typography>
		</Toolbar>
	);
}
