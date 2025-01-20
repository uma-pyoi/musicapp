'use client';
import { TracksPage } from '@/components/TracksPage/TracksPage';
import { Usable, use } from 'react';

interface IParams {
	id: string;
}

export default function Tracks({ params }: { params: Usable<IParams> }) {
	const { id } = use<IParams>(params);
	return (
		<>
			<TracksPage albumId={id} />
		</>
	);
}
