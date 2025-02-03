'use client';

import { ArtistsForm } from '@/components/Forms/ArtistForm/ArtistForm';
import { withAuth } from '@/hoc/withAuth';
import { Role } from '@/interfaces/IUser';

function ArtistsCreation() {
	return <ArtistsForm />;
}

export default withAuth(ArtistsCreation, Role.User);
