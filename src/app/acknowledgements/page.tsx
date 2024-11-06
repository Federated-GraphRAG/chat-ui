export default function Acknowledgements() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Acknowledgements</h1>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Favicon created by <a href="https://www.flaticon.com/free-icons/knowledge-graph" title="knowledge graph icons">Knowledge graph icons created by Grafixpoint - Flaticon</a>
          </li>
          <li>
            Built with <a href="https://nextjs.org/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Next.js</a>
          </li>
          <li>
            Solution designed by Wes Jackson
          </li>
        </ul>
      </div>
    );
  }