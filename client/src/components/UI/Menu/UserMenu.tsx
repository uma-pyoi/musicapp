import { Grid2, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material';
import { StyledLink } from '../../ArtistsPage/ArtistsList/ArtistsListItem/ArtistsListItem';
import { useAppDispatch } from '@/store/hooks';
import { logoutUser } from '@/features/userSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const CursorPointer = styled(Typography)(() => ({
	'&:hover': {
		cursor: 'pointer',
	},
}));

type createEntity = 'artist' | 'album' | 'track';

export function UserMenu() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const logoutHandler = () => {
		dispatch(logoutUser());
	};

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItem = (entity: createEntity) => {
		router.push(`/create/${entity}`);
		handleClose();
	};

	return (
		<Toolbar sx={{ gap: 2 }}>
			<Typography component={StyledLink} href='/track-history'>
				Track History
			</Typography>
			<Typography component={CursorPointer} onClick={logoutHandler}>
				Logout
			</Typography>
			<Grid2>
				<Typography component={CursorPointer} onClick={handleMenu}>
					Create
				</Typography>
				<Menu
					id='menu-create'
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={() => handleMenuItem('artist')}>New Artist</MenuItem>
					<MenuItem onClick={() => handleMenuItem('album')}>New Album</MenuItem>
					<MenuItem onClick={() => handleMenuItem('track')}>New Track</MenuItem>
				</Menu>
			</Grid2>
			<Typography component={StyledLink} href='/unpublished'>
				Unpublished
			</Typography>
		</Toolbar>
	);
}
