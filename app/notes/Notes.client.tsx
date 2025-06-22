'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './page.module.css';
import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
import { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import NoteModal from '@/components/NoteModal/NoteModal';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';

type NotesClientProps = {
	query: string;
	page: number;
};

function NotesClient({ query, page }: NotesClientProps) {
	const [currentPage, setCurrentPage] = useState(page);
	const [isModalOpen, setIsOpenModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState(query);
	const [debouncedText] = useDebounce(searchQuery, 300);

	const { data, isSuccess, isError, error } = useQuery({
		queryKey: ['notes', debouncedText, currentPage],
		queryFn: () => fetchNotes(debouncedText, currentPage),
		placeholderData: keepPreviousData,
		refetchOnMount: false,
	});

	if (isError) throw error;

	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedText]);

	function handleSearchChange(value: string) {
		setSearchQuery(value);
	}

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox inputValue={searchQuery} onChange={handleSearchChange} />

				{isSuccess && data.totalPages > 1 && (
					<Pagination
						totalPages={data.totalPages}
						setPage={handlePageChange}
						currentPage={currentPage}
						pageRangeDisplayed={5}
						marginPagesDisplayed={1}
					/>
				)}

				<button className={css.button} onClick={() => setIsOpenModal(true)}>
					Create note +
				</button>
			</header>
			{isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
			{isModalOpen && <NoteModal onClose={() => setIsOpenModal(false)} />}
		</div>
	);
}

export default NotesClient;
