'use client';

import QueryInterface from '@/components/QueryInterface';
import GraphVisualization from '@/components/GraphVisualization';
import ResultsDisplay from '@/components/ResultsDisplay';

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat UI</h1>
      <QueryInterface />
      <div className="flex mt-4">
        <GraphVisualization />
        <ResultsDisplay />
      </div>
    </div>
  );
}