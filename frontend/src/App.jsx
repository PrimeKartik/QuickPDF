import { useState } from 'react';
import WordToPdf from './components/WordToPdf';
import MergePdf from './components/MergePdf';

function App() {
  const [activeTab, setActiveTab] = useState('wordToPdf');

  return (
    <div className="min-h-screen bg-brand-gradient text-text-tertiary font-body flex flex-col">
      {/* Top Navigation with Logo */}
      <nav className="w-full flex items-center px-8 py-6">
        <div className="flex items-center select-none cursor-pointer group">
          <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 group-hover:scale-105 transition-transform duration-300">
            <defs>
              <linearGradient id="docGradient" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1a75ff" />
                <stop offset="1" stopColor="#004bcc" />
              </linearGradient>
              <linearGradient id="boltGradient" x1="26" y1="4" x2="16" y2="38" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffeb3b" />
                <stop offset="1" stopColor="#ff9800" />
              </linearGradient>
              <filter id="boltShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.3"/>
              </filter>
            </defs>
            {/* Document Base */}
            <path d="M4 8C4 5.79086 5.79086 4 8 4H26L36 14V32C36 34.2091 34.2091 36 32 36H8C5.79086 36 4 34.2091 4 32V8Z" fill="url(#docGradient)"/>
            {/* Fold */}
            <path d="M26 4V10C26 12.2091 27.7909 14 30 14H36L26 4Z" fill="#003ab3" opacity="0.6"/>
            {/* PDF Text */}
            <text x="6" y="16" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="9" letterSpacing="-0.5">PDF</text>
            {/* Lightning Bolt */}
            <path filter="url(#boltShadow)" d="M26 3L11 22H21L15 39L33 18H23L26 3Z" fill="url(#boltGradient)" />
          </svg>
          <span className="text-[28px] font-bold tracking-tight ml-2 flex items-center">
            <span className="text-text-tertiary">Quick</span>
            <span className="text-[#0061ff]">PDF</span>
          </span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="px-6 py-6 flex flex-col items-center flex-grow w-full max-w-6xl mx-auto">
        
        {/* Centered Tabs */}
        <div className="flex justify-center items-center gap-8 mb-10 border-b border-gray-200/50 pb-4 w-full max-w-lg">
          <button 
            onClick={() => setActiveTab('wordToPdf')}
            className={`text-xl font-bold transition-all duration-fast pb-2 relative ${activeTab === 'wordToPdf' ? 'text-surface-raised' : 'text-text-secondary hover:text-text-tertiary'}`}
          >
            Word to PDF
            {activeTab === 'wordToPdf' && (
              <span className="absolute bottom-[-17px] left-0 w-full h-[3px] bg-surface-raised rounded-t-md"></span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('mergePdf')}
            className={`text-xl font-bold transition-all duration-fast pb-2 relative ${activeTab === 'mergePdf' ? 'text-surface-raised' : 'text-text-secondary hover:text-text-tertiary'}`}
          >
            Merge PDF
            {activeTab === 'mergePdf' && (
              <span className="absolute bottom-[-17px] left-0 w-full h-[3px] bg-surface-raised rounded-t-md"></span>
            )}
          </button>
        </div>

        {/* Header Section */}
        {activeTab === 'wordToPdf' ? (
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-text-tertiary mb-4 tracking-tight">Word to PDF – Convert DOC/DOCX to PDF</h1>
            <p className="text-md text-text-secondary">
              Convert Word documents to PDF online for free.
            </p>
            <p className="text-md text-text-secondary mt-1">
              This Word to PDF converter lets you change DOCX to PDF format quickly and easily.
            </p>
          </div>
        ) : (
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-text-tertiary mb-4 tracking-tight">Merge PDF – Combine PDF files online</h1>
            <p className="text-md text-text-secondary">
              Combine multiple PDFs into one document easily and securely.
            </p>
            <p className="text-md text-text-secondary mt-1">
              Merge unlimited PDFs into a single file in just a few seconds.
            </p>
          </div>
        )}

        {/* Dynamic Tool Component */}
        {activeTab === 'wordToPdf' ? <WordToPdf /> : <MergePdf />}
        
      </main>

      {/* Footer */}
      <footer className="w-full py-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col items-center px-6">
          <span className="text-sm text-text-secondary">© 2026 Convert Word to PDF Online for Free. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
