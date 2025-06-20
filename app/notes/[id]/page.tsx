import { fetchNoteById } from '@/lib/api';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

type NoteDetailsProps = {
	params: Promise<{ id: number }>;
};

async function NoteDetails({ params }: NoteDetailsProps) {
	const queryClient = new QueryClient();

	const { id } = await params;

	await queryClient.prefetchQuery({
		queryKey: ['notes', id],
		queryFn: () => fetchNoteById(id),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NoteDetailsClient />
		</HydrationBoundary>
	);
}

export default NoteDetails;
