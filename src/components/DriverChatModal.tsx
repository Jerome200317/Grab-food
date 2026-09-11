import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Phone, ShieldCheck, CheckCheck } from 'lucide-react';
import { DriverInfo } from '../types';

interface DriverChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: DriverInfo;
  customerName: string;
}

interface Message {
  id: string;
  sender: 'customer' | 'driver';
  text: string;
  time: string;
}

export const DriverChatModal: React.FC<DriverChatModalProps> = ({
  isOpen,
  onClose,
  driver,
  customerName
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'driver',
      text: `Hello ${customerName}! I'm ${driver.name}, your GrabFood delivery partner today. I've collected your hot order and am currently on my way.`,
      time: '21:19'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'Please leave at the doorstep',
    'Is the extra chili sauce included?',
    'Ring bell once after drop-off',
    'Take your time, ride safely!'
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'customer',
      text,
      time: timeStr
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputText('');

    // Driver AI/Simulated Response after brief delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let reply = "Got it! Thanks for the note, I'm taking care of it.";
      const lower = text.toLowerCase();
      if (lower.includes('door') || lower.includes('doorstep')) {
        reply = "Understood! I will place your food neatly on the doorstep / shoe cabinet as requested.";
      } else if (lower.includes('chili') || lower.includes('sauce')) {
        reply = "Yes, I verified with the restaurant kitchen staff. They packed extra chili & soy sauce sachets!";
      } else if (lower.includes('ring') || lower.includes('bell')) {
        reply = "Sure, I'll press the doorbell once after safe placement!";
      } else if (lower.includes('safe') || lower.includes('time')) {
        reply = "Thank you so much! Roads are clear, arriving in about 3 to 4 minutes.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'driver',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full h-[540px] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Header with Driver Details */}
        <div className="p-4 bg-emerald-600 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={driver.avatar}
                alt={driver.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/80"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-600"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white">{driver.name}</h3>
                <span className="text-[10px] bg-emerald-700 text-emerald-100 font-bold px-1.5 py-0.5 rounded">
                  ★ {driver.rating}
                </span>
              </div>
              <p className="text-[11px] text-emerald-100">
                {driver.vehicleModel} · {driver.vehiclePlate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsCalling(true)}
              className="p-2 rounded-full hover:bg-emerald-700 text-white transition-colors cursor-pointer"
              title="Call Driver"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-emerald-700 text-white transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Driver Calling Screen Simulation */}
        {isCalling && (
          <div className="absolute inset-0 z-50 bg-neutral-900/95 text-white flex flex-col items-center justify-between p-8 animate-in fade-in">
            <div className="text-center mt-6">
              <span className="text-xs text-neutral-400 uppercase tracking-wider block">Connecting Call via Grab Voip</span>
              <h4 className="text-xl font-bold mt-1">{driver.name}</h4>
              <p className="text-xs text-neutral-400 mt-0.5">{driver.phone}</p>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-emerald-500/20 animate-ping absolute"></div>
              <img
                src={driver.avatar}
                alt={driver.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500 relative z-10"
              />
            </div>

            <div className="w-full text-center space-y-3 mb-4">
              <p className="text-xs text-neutral-300">"Driver is currently stopped safely at Paterson Rd signal."</p>
              <button
                onClick={() => setIsCalling(false)}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                End Call
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50/50">
          <div className="text-center my-2">
            <span className="text-[10px] bg-neutral-200/70 text-neutral-600 font-medium px-2.5 py-1 rounded-full">
              Masked phone & end-to-end encrypted
            </span>
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'customer' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                  m.sender === 'customer'
                    ? 'bg-emerald-600 text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-neutral-800 border border-neutral-200/90 rounded-bl-xs shadow-xs'
                }`}
              >
                {m.text}
              </div>
              <div className="flex items-center gap-1 mt-0.5 text-[10px] text-neutral-400 px-1">
                <span>{m.time}</span>
                {m.sender === 'customer' && <CheckCheck className="w-3 h-3 text-emerald-600" />}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-white border border-neutral-200 px-3 py-1.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] font-medium ml-1">Driver is typing...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick reply chips */}
        <div className="p-2 bg-white border-t border-neutral-100 overflow-x-auto no-scrollbar flex gap-1.5">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(reply)}
              className="text-[11px] whitespace-nowrap bg-neutral-100 hover:bg-emerald-50 hover:text-emerald-700 text-neutral-700 px-2.5 py-1 rounded-lg border border-neutral-200 transition-colors shrink-0 cursor-pointer"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Text Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Type a message to your courier..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3 py-2 text-xs bg-neutral-100 rounded-xl border border-transparent focus:border-emerald-500 focus:bg-white focus:outline-hidden"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
