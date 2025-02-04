import { IArtist } from '@/interfaces/IArtist';
import { useAppDispatch } from '@/store/hooks';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Grid2,
	IconButton,
	styled,
} from '@mui/material';
import Link from 'next/link';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteArtist, fetchArtists } from '@/features/artistsSlice';

interface Props {
	artist: IArtist;
	isUnpublished: boolean;
}

export const StyledLink = styled(Link)(() => ({
	color: 'inherit',
	textDecoration: 'none',
	['&^hover']: 'inherit',
}));

export function ArtistsListItem({ artist, isUnpublished }: Props) {
	const { name, id, image } = artist;
	const dispatch = useAppDispatch();

	let cardImage = 'http://localhost:3000/image_not_available.png';
	if (image) {
		cardImage = `${process.env.SERVER_URL}/uploads/${image}`;
	}

	const handlePublish = () => {
		//
	};

	const handleDelete = async () => {
		await dispatch(deleteArtist(id));
		await dispatch(fetchArtists());
	};

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
							/>
						</Grid2>
						{isUnpublished ? (
							<CardContent>
								<Button onClick={handlePublish}>Publish</Button>
								<IconButton onClick={handleDelete}>
									<DeleteOutlineIcon />
								</IconButton>
							</CardContent>
						) : null}
					</Grid2>
				</Box>
			</Card>
		</Grid2>
	);
}
