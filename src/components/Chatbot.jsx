import { useState, useEffect, useRef } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.onend = () => setListening(false);
      recognition.onerror = () => setListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);

    try {
      const res = await fetch('/api/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          sessionId: 'guest', // or user._id
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { from: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: 'Sorry, something went wrong.' },
      ]);
    }

    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat UI */}
      <div className="bg-white rounded-xl shadow-xl w-[300px] p-4">
        <div className="h-[250px] overflow-y-auto space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-sm px-3 py-2 rounded-lg ${
                msg.from === 'bot'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-green-100 text-green-800 text-right'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex mt-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or speak..."
            className="flex-1 border px-3 py-2 rounded-l-lg"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-4 rounded-r-lg"
          >
            Send
          </button>
        </div>

        <button
          onClick={startListening}
          className={`mt-2 w-full py-2 rounded-lg ${
            listening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {listening ? 'Listening...' : '🎤 Voice Input'}
        </button>
      </div>
    </div>
  );
}