"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { executeQuery, logQuery } from "@/store/slices/graphSlice";
import { initSocket, closeSocket } from "@/lib/mockSocket";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartMessage = ({ data }: { data: ChartData<"bar"> }) => (
  <div className="bg-gray-800 p-4 rounded-lg mt-2">
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" as const, labels: { color: "white" } },
          title: { display: true, text: "Influenza Trends", color: "white" },
        },
        scales: {
          x: { ticks: { color: "white" } },
          y: { ticks: { color: "white" } },
        },
      }}
    />
  </div>
);

const TableMessage = ({
  data,
}: {
  data: Array<{ region: string; cases: number }>;
}) => (
  <table className="mt-2 w-full text-sm text-left text-gray-300">
    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">Region</th>
        <th scope="col" className="px-6 py-3">Cases</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.region} className="border-b bg-gray-800 border-gray-700">
          <td className="px-6 py-4">{row.region}</td>
          <td className="px-6 py-4">{row.cases}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default function Chat() {
  const [messages, setMessages] = useState<
    Array<{
      text: string;
      isUser: boolean;
      chart?: ChartData<"bar">;
      table?: Array<{ region: string; cases: number }>;
    }>
  >([]);
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const { results, loading, error } = useAppSelector((state) => state.graph);

  useEffect(() => {
    initSocket();
    return () => closeSocket();
  }, []);

  useEffect(() => {
    if (results) {
      if (results.type === "chart") {
        setMessages((prev) => [
          ...prev,
          { text: results.message, isUser: false, chart: results.data },
        ]);
      } else if (results.type === "table") {
        setMessages((prev) => [
          ...prev,
          { text: results.message, isUser: false, table: results.data },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: results.message, isUser: false },
        ]);
      }
    }
  }, [results]);

  useEffect(() => {
    if (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error: " + error, isUser: false },
      ]);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    setMessages((prev) => [...prev, { text: input, isUser: true }]);
  
    dispatch(executeQuery(input));
    dispatch(logQuery({ query: input, source: 'chat' }));
  
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-2xl p-3 rounded-lg ${
                message.isUser ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              <p className="text-sm mb-2">{message.isUser ? "You" : "Bot"}</p>
              <p className="whitespace-pre-wrap">{message.text}</p>
              {message.chart && <ChartMessage data={message.chart} />}
              {message.table && <TableMessage data={message.table} />}
            </div>
          </div>
        ))}
        {loading && <div className="text-center">Loading...</div>}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 bg-gray-800 text-white border border-gray-700 rounded-l focus:outline-none focus:border-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}