"use client";

import { useState, useRef, useEffect } from "react";
import "./page.css";
import Footer from "../components/footer";
import { usePathname } from "next/navigation";
export default function Guestmode() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // { type: 'user' | 'bot', text, loading? }
  const textareaRef = useRef(null);
  const contentRef = useRef(null);

  // --- helpers ---
  // turn all markdown links into <a> elements
  const pathname = usePathname();
      useEffect(() => {
          // Runs on every route change (including back/forward)
          console.log("Route changed:", pathname);
          // reset state, re-run UI logic, etc.
      }, [pathname]);
  const renderWithLinks = (text) => {
    const parts = [];
    const rx = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g; // global!
    let last = 0;
    let m;
    while ((m = rx.exec(text)) !== null) {
      if (m.index > last) parts.push(text.slice(last, m.index));
      parts.push(
        <a
          key={`lnk-${last}-${rx.lastIndex}`}
          href={m[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600"
        >
          {m[1]}
        </a>
      );
      last = rx.lastIndex;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  };

  // split bot text into lines (bullets/newlines) and render
  const renderBotText = (text) => {
    const lines = text
      .split(/\n+|\s-\s/g) // split on newlines OR " - "
      .map((s) => s.trim())
      .filter(Boolean);

    return (
      <div className="space-y-2">
        {lines.map((ln, i) => (
          <p key={i} className="leading-relaxed">
            {i > 0 ? "• " : ""}
            {renderWithLinks(ln)}
          </p>
        ))}
      </div>
    );
  };

  // auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // scroll to bottom on new messages
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");

    let loadingIndex = -1;
    // add user bubble + loading bot bubble atomically
    setMessages((prev) => {
      const next = [
        ...prev,
        { type: "user", text: userMessage },
        { type: "bot", text: "Loading…", loading: true },
      ];
      loadingIndex = next.length - 1;
      return next;
    });

    // fetch bot reply
    (async () => {
      try {
        const res = await fetch("https://forever-backend-production.up.railway.app/chat/guestmode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userMessage }),
        });
        if (!res.ok) throw new Error("Failed to fetch chat response");
        const data = await res.json();

        setMessages((prev) => {
          const next = [...prev];
          // replace the loading bubble with real answer
          if (next[loadingIndex]?.loading) {
            next[loadingIndex] = { type: "bot", text: data.message };
          } else {
            next.push({ type: "bot", text: data.message });
          }
          return next;
        });
      } catch {
        setMessages((prev) => {
          const next = [...prev];
          if (next[loadingIndex]?.loading) {
            next[loadingIndex] = {
              type: "bot",
              text: " Eroare la preluarea răspunsului.",
            };
          }
          return next;
        });
      }
    })();
  };

  return (
    <div className='chat'>
      <div id="navbar-chat">
        <h1 id="h1">Forever Life</h1>
      </div>

      <div
        id="content"
        ref={contentRef}
        className="flex flex-col gap-2 p-4 overflow-y-auto h-[400px] bg-gray-50 rounded-md"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`break-words px-4 py-2 rounded-lg ${
              msg.type === "user"
                ? "self-end bg-[#71AD8D] text-white max-w-xs"
                : "self-start bg-gray-200 text-gray-800 max-w-[70%]"
            }`}
          >
            {msg.loading ? (
              <span className="inline-flex items-center gap-2">
                Loading
                <span className="inline-block animate-pulse">●●●</span>
              </span>
            ) : msg.type === "bot" ? (
              renderBotText(msg.text)
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      <div id="input" className="mt-2">
        <form
          onSubmit={handleSubmit}
          className="flex items-center p-2 border-t border-gray-300 bg-white rounded-md shadow-sm"
        >
           <div className="flex-1 flex flex-col-reverse">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={1}
                    className="resize-none border-none outline-none p-2 text-gray-800 placeholder-gray-400 bg-gray-50 rounded-md max-h-40 overflow-y-auto text-left"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            handleSubmit(e);
                        }
                    }}
                />

                   
            </div>
          <button
            type="submit"
            className="px-4 py-2 rounded text-white flex-shrink-0"
            style={{ backgroundColor: "#71AD8D" }}
          >
            Send
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}





/*"use client";

import { useState, useRef, useEffect } from "react";
import './page.css';
import Footer from "../components/footer";

export default function Guestmode() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // { type: 'user' | 'bot', text: string, loading?: boolean }
  const textareaRef = useRef(null);
  const contentRef = useRef(null);

  // Auto-resize the textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Scroll to bottom when new message is added
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");

    // Add user message
    setMessages(prev => [...prev, { type: "user", text: userMessage }]);

    // Add temporary loading message for bot
    const loadingIndex = messages.length + 1;
    setMessages(prev => [...prev, { type: "bot", text: "Loading...", loading: true }]);

    // Fetch AI response
    const chatResponse = async (question) => {
      try {
        const res = await fetch("http://localhost:5000/chat/guestmode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });

        if (!res.ok) throw new Error("Failed to fetch chat response");
        const data = await res.json();

        // Replace loading message with bot response
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { type: "bot", text: data.message };
          return newMessages;
        });
      } catch (err) {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { type: "bot", text: "⚠️ Error fetching response." };
          return newMessages;
        });
      }
    };

    chatResponse(userMessage);
  };

  return (
    <>
      <div id="navbar">
        <h1>Forever AI Helper</h1>
      </div>

      <div
        id="content"
        ref={contentRef}
        className="flex flex-col gap-2 p-4 overflow-y-auto h-[400px] bg-gray-50 rounded-md"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`break-words px-4 py-2 rounded-lg ${
              msg.type === "user"
                ? "self-end bg-[#71AD8D] text-white max-w-xs"
                : "self-start bg-gray-200 text-gray-800 max-w-md"
            }`}
          >
            {msg.text.split(/ - /).map((part, i) => {
            // If it contains a markdown link
            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
                const [_, text, url] = linkMatch;
                const cleanText = part.replace(linkMatch[0], "");
                return (
                <p key={i} className="mb-2">
                    {cleanText.trim()}{" "}
                    <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                    >
                    {text}
                    </a>
                </p>
                );
            }
            return (
                <p key={i} className="mb-2">
                {part.trim()}
                </p>
            );
            })}

            {msg.loading && (
              <span className="ml-2 animate-pulse">...</span>
            )}
          </div>
        ))}
      </div>

      <div id="input" className="mt-2">
        <form
          onSubmit={handleSubmit}
          className="flex items-center p-2 border-t border-gray-300 bg-white rounded-md shadow-sm"
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 resize-none border-none outline-none p-2 text-gray-800 placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded text-white flex-shrink-0"
            style={{ backgroundColor: "#71AD8D" }}
          >
            Send
          </button>
        </form>
      </div>

      <Footer />
    </>
  );

  */
