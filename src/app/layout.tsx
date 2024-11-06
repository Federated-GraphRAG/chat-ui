import type { Metadata } from "next";
import "./globals.css";
import { Providers } from '../store/provider';
import Sidebar from '@/components/Sidebar';


export const metadata: Metadata = {
  title: "Chat UI",
  description: "A chat UI for use with LLM applications, such as a RAG chatbot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}