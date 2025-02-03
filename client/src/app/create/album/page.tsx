'use client';

import { AlbumForm } from '@/components/Forms/AlbumForm/AlbumForm';
import { withAuth } from '@/hoc/withAuth';
import { Role } from '@/interfaces/IUser';

function AlbumsCreation() {
	return <AlbumForm />;
}

export default withAuth(AlbumsCreation, Role.User);
