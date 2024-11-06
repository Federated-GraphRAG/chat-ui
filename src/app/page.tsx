import Chat from '@/components/Chat';

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Welcome to Chat UI</h1>
      <div className="flex-1">
        <Chat />
      </div>
    </div>
  );
}