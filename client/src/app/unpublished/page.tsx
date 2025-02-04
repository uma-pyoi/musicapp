'use client';

import { UnpublishedPage } from '@/components/UnpublishedPage/UnpublishedPage';
import { withAuth } from '@/hoc/withAuth';
import { Role } from '@/interfaces/IUser';

function Unpublished() {
	return <UnpublishedPage />;
}

export default withAuth(Unpublished, Role.Admin);
