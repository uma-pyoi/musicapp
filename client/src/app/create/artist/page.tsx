'use client';

import { ArtistForm } from '@/components/Forms/ArtistForm/ArtistForm';
import { withAuth } from '@/hoc/withAuth';
import { Role } from '@/interfaces/IUser';

function ArtistsCreation() {
	return <ArtistForm />;
}

export default withAuth(ArtistsCreation, Role.User);
