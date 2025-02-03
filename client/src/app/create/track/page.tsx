'use client';

import { TrackForm } from '@/components/Forms/TrackForm/TrackForm';
import { withAuth } from '@/hoc/withAuth';
import { Role } from '@/interfaces/IUser';

function TracksCreation() {
	return <TrackForm />;
}

export default withAuth(TracksCreation, Role.User);
