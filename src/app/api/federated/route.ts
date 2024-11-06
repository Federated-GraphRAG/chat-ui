import { NextResponse } from 'next/server';
import { store } from '@/store';
import { executeQuery, logQuery } from '@/store/slices/graphSlice';

export async function POST(req: Request) {
  const { query } = await req.json();
  
  try {
    await store.dispatch(executeQuery(query));
    store.dispatch(logQuery({ query, source: 'api' }));
    const result = store.getState().graph.results;
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error executing query:', error);
    return NextResponse.json({ error: 'Error executing query' }, { status: 500 });
  }
}