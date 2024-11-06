'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';

export default function LogList() {
  const logs = useAppSelector((state) => state.graph.logs);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Query Logs</h2>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="border p-2 rounded">
            <Link href={`/logs/${log.id}`} className="text-blue-500 hover:underline">
              {new Date(log.timestamp).toLocaleString()} - {log.source}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}