'use client';
import { AlbumsPage } from '@/components/AlbumsPage/AlbumsPage';
import { Usable, use } from 'react';

interface IParams {
	id: string;
}

export default function Albums({ params }: { params: Usable<IParams> }) {
	const { id } = use<IParams>(params);
	return (
		<>
			<AlbumsPage artistId={id} />
		</>
	);
}
