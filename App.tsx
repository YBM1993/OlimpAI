
import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Button } from './components/Button';
import { GuideModal } from './components/GuideModal';
import { Message, ProgrammingLanguage } from './types';
import { getCoachResponse, runVirtualCode } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Сәлем, болашақ чемпион! Мен OlympAI-мын. Кодыңды жібер немесе алгоритмдер туралы сұрақ қой. Есіңде болсын: мен дайын шешімді бермеймін, мен саған ойлануға көмектесемін.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [stdin, setStdin] = useState('');
  const [stdout, setStdout] = useState('');
  const [language, setLanguage] = useState<ProgrammingLanguage>(ProgrammingLanguage.CPP);
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleLoadExample = () => {
    if (language === ProgrammingLanguage.PYTHON) {
      const pythonExample = `# Python-дағы мысал: Тізімнің минимумын табу\n# Ескерту: Бұл кодта логикалық қате болуы мүмкін\n\nn = int(input())\narr = list(map(int, input().split()))\n\nmin_val = 0  # Мұнда қате болуы мүмкін бе?\nfor x in arr:\n    if x < min_val:\n        min_val = x\n\nprint(min_val)`;
      setCode(pythonExample);
      setStdin("3\n5 10 2"); 
    } else {
      const cppExample = `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int sum = 0; // ҚАТЕ: үлкен сандар үшін long long керек\n    for(int i = 0; i < n; i++) {\n        int x;\n        cin >> x;\n        sum += x;\n    }\n    cout << sum << endl;\n    return 0;\n}`;
      setCode(cppExample);
      setStdin("2\n2000000000\n2000000000");
    }
  };

  const handleRunCode = async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setActiveTab('output');
    setStdout('Орындалуда...');
    const result = await runVirtualCode(code, stdin, language);
    setStdout(result);
    setIsRunning(false);
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !code.trim()) return;

    const userMsgText = input || (code ? "Кодымды тексеріп берші." : "");
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMsgText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const coachText = await getCoachResponse(userMsgText, code);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: coachText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar onOpenGuide={() => setIsGuideOpen(true)} />
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      <main className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800">Дайындық зертханасы</h2>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-wider">Live Coaching</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="secondary" 
              className="!py-1.5 !px-3 text-[11px] uppercase tracking-tighter bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100"
              onClick={handleLoadExample}
            >
              Мысалды жүктеу
            </Button>
            <div className="w-[1px] h-6 bg-slate-200 mx-1"></div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as ProgrammingLanguage)}
              className="text-sm bg-slate-100 border-none rounded-md px-3 py-1.5 focus:ring-2 focus:ring-[#00AFCA] font-semibold"
            >
              {Object.values(ProgrammingLanguage).map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <Button 
              variant="primary" 
              className="!py-1.5 !px-3 text-sm gap-2" 
              onClick={handleRunCode}
              isLoading={isRunning}
            >
              {!isRunning && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>}
              Іске қосу
            </Button>
            <Button variant="secondary" className="!py-1.5 !px-3 text-sm" onClick={() => { setCode(''); setStdout(''); setStdin(''); }}>Тазалау</Button>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Side: Code Editor & Console */}
          <div className="flex-1 border-r border-slate-200 flex flex-col bg-[#1e1e1e]">
            <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#333]">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">solution.{language === ProgrammingLanguage.CPP ? 'cpp' : language === ProgrammingLanguage.PYTHON ? 'py' : language === ProgrammingLanguage.JAVA ? 'java' : 'pas'}</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Код редакторы</span>
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent text-[#d4d4d4] font-mono p-4 resize-none focus:outline-none text-sm leading-relaxed"
              placeholder="# Кодты осында жаз немесе 'Мысалды жүктеу' батырмасын бас..."
              spellCheck={false}
            />

            {/* Console Area */}
            <div className="h-1/3 bg-[#1e1e1e] border-t border-[#333] flex flex-col">
              <div className="flex bg-[#252526] px-2">
                <button 
                  onClick={() => setActiveTab('input')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'input' ? 'text-white border-b-2 border-[#00AFCA]' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Енгізу (Stdin)
                </button>
                <button 
                  onClick={() => setActiveTab('output')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'output' ? 'text-white border-b-2 border-[#00AFCA]' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Нәтиже (Stdout)
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                {activeTab === 'input' ? (
                  <textarea
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    className="w-full h-full bg-transparent text-[#d4d4d4] font-mono p-3 resize-none focus:outline-none text-xs"
                    placeholder="Бағдарламаға берілетін деректерді енгіз..."
                    spellCheck={false}
                  />
                ) : (
                  <div className="w-full h-full p-3 font-mono text-xs text-green-400 overflow-y-auto whitespace-pre-wrap">
                    {stdout || <span className="text-slate-600 italic">Мұнда бағдарламаның нәтижесі шығады...</span>}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Chat */}
          <div className="w-full lg:w-[400px] flex flex-col bg-white shadow-xl relative z-10">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth" ref={scrollRef}>
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-[#00AFCA] text-white rounded-tr-none' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                  }`}>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-[10px] font-bold opacity-70 uppercase tracking-tighter">
                        {m.role === 'assistant' ? 'Тренер OlympAI' : 'Ученик'}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                    <span className="text-[9px] block mt-1 opacity-50 text-right">
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 rounded-2xl rounded-tl-none p-4 flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmitMessage} className="p-4 border-t border-slate-200 bg-slate-50">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmitMessage(e);
                    }
                  }}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#00AFCA] transition-all text-sm min-h-[50px] max-h-[150px] resize-none"
                  placeholder="Сұрақ қою..."
                />
                <button 
                  type="submit"
                  disabled={isLoading || (!input.trim() && !code.trim())}
                  className="absolute right-2 bottom-3 p-2 text-[#00AFCA] hover:bg-[#00AFCA] hover:text-white rounded-lg transition-colors disabled:text-slate-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 text-center">
                Enter — жіберу. Shift+Enter — жаңа жол.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
