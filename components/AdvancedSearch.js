import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdvancedSearch() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  function submitForm(e) {
    e.preventDefault();
    const queryString = `title=true&q=${encodeURIComponent(searchValue)}`;

    
    setSearchHistory(current => [...current, queryString]);

    router.push(`/artwork?${queryString}`);
  }

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        placeholder="Search artworks"
      />
      <button type="submit">Search</button>
    </form>
  );
}
