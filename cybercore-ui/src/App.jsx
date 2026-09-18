import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, Terminal, Cpu } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Sistem aktif. Yerel Llama 3 motoruna bağlandım. Size nasıl yardımcı olabilirim?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Otomatik aşağı kaydırma
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'ai', text: '⚠️ Backend servisine bağlanırken bir hata oluştu.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-950/20 to-slate-950 flex flex-col items-center justify-center p-4 md:p-6">
      
      {/* Şık Arka Plan Parıltısı */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Ana Konteyner */}
      <div className="w-full max-w-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl shadow-purple-950/20 flex flex-col h-[720px] overflow-hidden relative z-10">
        
        {/* Kibar Header */}
        <div className="bg-slate-900/80 border-b border-slate-800/60 px-6 py-4 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-100 tracking-wide flex items-center gap-2">
                CyberCore AI
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </h1>
              <p className="text-xs text-slate-400 font-mono">Llama-3 // Local Engine</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-950/50 border border-slate-800/80 px-3 py-1.5 rounded-full text-xs text-slate-400 font-mono">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>SPRING BOOT</span>
          </div>
        </div>

        {/* Akıcı Chat Alanı */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[82%] ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* İkon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs border ${
                  m.sender === 'user' 
                    ? 'bg-purple-600 text-white border-purple-500/50' 
                    : 'bg-slate-800/80 text-purple-400 border-slate-700/50'
                }`}>
                  {m.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>

                {/* Mesaj Balonu */}
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-purple-600/90 text-white rounded-tr-none'
                    : 'bg-slate-800/60 border border-slate-700/40 text-slate-200 rounded-tl-none backdrop-blur-sm'
                }`}>
                  {m.text}
                </div>

              </div>
            </div>
          ))}

          {/* Yükleniyor Efekti */}
          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-3 items-center text-slate-400 text-xs font-mono bg-slate-800/30 border border-slate-800 rounded-xl px-4 py-3">
                <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
                <span>Yapay zekâ yanıt üretiyor...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Modern Form Alanı */}
        <form onSubmit={sendMessage} className="p-4 bg-slate-950/80 border-t border-slate-800/60 flex gap-3 items-center backdrop-blur-md">
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Bir şeyler sorun veya komut yazın..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/60 transition-all font-sans"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-5 py-3 rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20 shrink-0"
          >
            <span>Gönder</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}

export default App;