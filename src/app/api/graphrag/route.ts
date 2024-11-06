import { NextResponse } from 'next/server';
import { executeGraphQuery } from '@/lib/neo4j';

export async function POST(req: Request) {
  const { query } = await req.json();
  try {
    const result = await executeGraphQuery(query);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error executing query:', error);
    return NextResponse.json({ error: 'Error executing query' }, { status: 500 });
  }
}