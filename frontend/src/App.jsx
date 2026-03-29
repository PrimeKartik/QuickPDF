import { useState } from 'react';
import WordToPdf from './components/WordToPdf';
import MergePdf from './components/MergePdf';

function App() {
  const [activeTab, setActiveTab] = useState('wordToPdf');

  return (
    <div className="min-h-screen bg-background text-on-background font-body selection:bg-primary selection:text-on-primary">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#1c2026]/60 backdrop-blur-xl border-b border-[#3c494e]/15 shadow-[0_4px_20px_rgba(0,209,255,0.08)] flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-2 select-none group">
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
            <defs>
              <linearGradient id="logoRedGrad" x1="4" y1="12" x2="32" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f42a2a"/>
                <stop offset="100%" stopColor="#9b0606"/>
              </linearGradient>
              <linearGradient id="logoBoltGrad" x1="20" y1="4" x2="16" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffeb3b"/>
                <stop offset="100%" stopColor="#ff9800"/>
              </linearGradient>
              <filter id="boltShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.4"/>
              </filter>
            </defs>
            <rect x="4" y="12" width="28" height="28" rx="5" fill="url(#logoRedGrad)"/>
            <text x="8.5" y="24" fill="white" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="10.5" letterSpacing="0">PDF</text>
            <path d="M 4 30 Q 14 26 22 32 T 32 26 L 32 35 C 32 37.76 29.76 40 27 40 L 9 40 C 6.24 40 4 37.76 4 35 Z" fill="#000000" opacity="0.15"/>
            <path filter="url(#boltShadow)" d="M 37 2 L 15 24 L 23 24 L 7 46 L 27 18 L 19 18 Z" fill="url(#logoBoltGrad)"/>
          </svg>
          <span className="text-[28px] font-black tracking-tight font-headline flex items-center">
            <span className="text-white">Quick</span>
            <span className="text-[#e62020]">PDF</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 font-['Space_Grotesk'] tracking-wider uppercase text-sm">
          <button 
            onClick={() => setActiveTab('wordToPdf')}
            className={`${activeTab === 'wordToPdf' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant/70 hover:text-primary transition-colors'}`}
          >
            Word to PDF
          </button>
          <button 
            onClick={() => setActiveTab('mergePdf')}
            className={`${activeTab === 'mergePdf' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant/70 hover:text-primary transition-colors'}`}
          >
            Merge PDFs
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="hidden md:block px-4 py-1.5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold text-xs uppercase tracking-widest rounded-sm hover:scale-[0.98] transition-all kinetic-glow relative overflow-hidden">
            STATUS OPTIMIZED
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden min-h-screen">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
          <div class="absolute bottom-1/4 right-10 w-64 h-64 bg-primary-container/5 rounded-full blur-[100px]"></div>
        </div>

        {activeTab === 'wordToPdf' ? <WordToPdf /> : <MergePdf />}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#3c494e]/10 py-8 bg-[#0a0e14]">
        <div className="flex flex-col md:flex-row justify-between items-center px-10 w-full gap-6 md:gap-0 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-lg font-black text-[#7eecff]/40 font-headline uppercase tracking-tighter">QuickPDF</span>
            <span className="font-['Inter'] text-[10px] uppercase tracking-widest text-[#dfe2eb]/50">© 2026 QuickPDF. STARK INDUSTRIES PROTOCOL.</span>
          </div>
          <div className="flex gap-8">
            <a className="font-['Inter'] text-[10px] uppercase tracking-widest text-[#dfe2eb]/40 hover:text-[#7eecff] transition-colors" href="#">System Specs</a>
            <a className="font-['Inter'] text-[10px] uppercase tracking-widest text-[#dfe2eb]/40 hover:text-[#7eecff] transition-colors" href="#">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
