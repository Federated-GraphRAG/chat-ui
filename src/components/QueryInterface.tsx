'use client';

import { useState } from 'react';
import { executeQuery, logQuery } from '@/store/slices/graphSlice';
import { useAppDispatch } from '@/store/hooks';

export default function QueryInterface() {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(executeQuery(query));
    dispatch(logQuery({ query, source: 'dashboard' }));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded"
        rows={4}
        placeholder="Enter your query here..."
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Execute Query
      </button>
    </form>
  );
}