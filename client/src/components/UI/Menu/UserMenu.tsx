import { Toolbar, Typography } from '@mui/material';
import { StyledLink } from '../../ArtistsPage/ArtistsList/ArtistsListItem/ArtistsListItem';

export function UserMenu() {
	return (
		<Toolbar>
			<Typography component={StyledLink} href='/track-history'>
				Track History
			</Typography>
		</Toolbar>
	);
}
