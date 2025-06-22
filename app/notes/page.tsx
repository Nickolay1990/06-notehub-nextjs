import { fetchNotes } from '@/lib/api';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotesClient from './Notes.client';

export default async function Notes() {
	const queryClient = new QueryClient();

	const initialQuery: string = '';
	const initialPage: number = 1;

	await queryClient.prefetchQuery({
		queryKey: ['notes', initialQuery, initialPage],
		queryFn: () => fetchNotes(initialQuery, initialPage),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NotesClient query={initialQuery} page={initialPage} />
		</HydrationBoundary>
	);
}

export const dynamic = 'force-dynamic';
