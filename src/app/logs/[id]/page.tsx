'use client';

import { useAppSelector } from '@/store/hooks';
import { useParams } from 'next/navigation';

export default function LogDetailPage() {
  const { id } = useParams();
  const log = useAppSelector((state) => 
    state.graph.logs.find((log) => log.id === id)
  );

  if (!log) {
    return <div>Log entry not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Log Detail</h1>
      <div className="space-y-2">
        <p><strong>ID:</strong> {log.id}</p>
        <p><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</p>
        <p><strong>Source:</strong> {log.source}</p>
        <p><strong>Query:</strong> {log.query}</p>
        <div>
          <strong>Result:</strong>
          <pre className="bg-gray-100 p-2 mt-2 rounded overflow-auto">
            {JSON.stringify(log.result, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}