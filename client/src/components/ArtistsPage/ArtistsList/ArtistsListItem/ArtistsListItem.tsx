import { setCurrArtist } from '@/features/artistsSlice';
import { IArtist } from '@/interfaces/IArtist';
import { Box, Card, CardHeader, CardMedia, Grid2, styled } from '@mui/material';
import Link from 'next/link';

interface Props {
	artist: IArtist;
}

export const StyledLink = styled(Link)(() => ({
	color: 'inherit',
	textDecoration: 'none',
	['&^hover']: 'inherit',
}));

export function ArtistsListItem({ artist }: Props) {
	const { name, id, image } = artist;

	let cardImage = 'http://localhost:3000/image_not_available.png';
	if (image) {
		cardImage = `${process.env.SERVER_URL}/uploads/${image}`;
	}

	return (
		<Grid2 component='div' m={2}>
			<Card>
				<Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
					<Grid2 container sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
						<CardMedia component='img' sx={{ width: 151 }} image={cardImage} />
						<Grid2 container direction={'column'}>
							<CardHeader
								sx={{ wordBreak: 'break-all' }}
								title={name}
								component={StyledLink}
								href={`/artists/${id}`}
								onClick={setCurrArtist(artist)}
							/>
						</Grid2>
					</Grid2>
				</Box>
			</Card>
		</Grid2>
	);
}
