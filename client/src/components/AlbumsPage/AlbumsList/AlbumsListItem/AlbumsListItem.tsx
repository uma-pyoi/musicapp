import { StyledLink } from '@/components/ArtistsPage/ArtistsList/ArtistsListItem/ArtistsListItem';
import { IAlbum } from '@/interfaces/IAlbum';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Grid2,
	IconButton,
	Typography,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAppDispatch } from '@/store/hooks';
import { deleteAlbum, fetchAlbums } from '@/features/albumsSlice';

interface Props {
	album: IAlbum;
	isUnpublished: boolean;
}

export function AlbumsListItem({ album, isUnpublished }: Props) {
	const { title, releaseYear, id, image, tracksAmount } = album;
	const dispatch = useAppDispatch();

	let cardImage = 'http://localhost:3000/image_not_available.png';
	if (image) {
		cardImage = `${process.env.SERVER_URL}/uploads/${image}`;
	}

	const handlePublish = () => {
		//
	};

	const handleDelete = async () => {
		await dispatch(deleteAlbum(id));
		await dispatch(fetchAlbums());
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
								title={title}
								component={StyledLink}
								href={`/albums/${id}`}
							/>
							<CardContent>
								<Typography variant='h6'>{releaseYear}</Typography>

								<Typography variant='body2' sx={{ color: 'text.secondary' }}>
									{tracksAmount > 0 ? <>{tracksAmount} tracks</> : <>No tracks</>}
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
