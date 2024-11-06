'use client';

import { useAppSelector } from '@/store/hooks';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ResultsDisplay() {
  const results = useAppSelector((state) => state.graph.results);

  return (
    <div className="ml-4 w-1/2">
      <h2 className="text-xl font-semibold mb-2">Results</h2>
      {results ? (
        <div>
          {results.type === 'chart' && (
            <div>
              <h3>{results.message}</h3>
              <Bar
                data={results.data}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: true,
                      text: 'Influenza Trends',
                    },
                  },
                }}
              />
            </div>
          )}
          {results.type === 'table' && (
            <div>
              <h3>{results.message}</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Region</th>
                    <th className="border border-gray-300 p-2">Cases</th>
                  </tr>
                </thead>
                <tbody>
                  {results.data.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 p-2">{row.region}</td>
                      <td className="border border-gray-300 p-2">{row.cases}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {results.type === 'text' && (
            <div>
              <p>{results.message}</p>
            </div>
          )}
          <pre className="bg-gray-100 p-4 rounded overflow-auto mt-4">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      ) : (
        <p>No results to display</p>
      )}
    </div>
  );
}