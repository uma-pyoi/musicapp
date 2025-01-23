import { Toolbar, Typography } from '@mui/material';
import { StyledLink } from '../ArtistsPage/ArtistsList/ArtistsListItem/ArtistsListItem';

export function UserMenu() {
	return (
		<Toolbar>
			<Typography component={StyledLink} href='/albums/1'>
				Track History
			</Typography>
		</Toolbar>
	);
}
