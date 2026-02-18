'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

import { Weather, WeatherProps } from '../../components/weather';
import { ResponseRenderer } from '../../components/ResponseRenderer';

export default function Page() {
  const [input, setInput] = useState('');
  const { messages, sendMessage} = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({ text: input });
    setInput('');
  };
  console.log("Messages: ",messages)
  return (
    <div className="flex h-screen flex-col bg-neutral-950 text-neutral-100">
      
      <header className="border-b border-neutral-800 bg-neutral-900 px-4 py-3 font-semibold">
        Generative UI POC
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow
                ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-900 text-neutral-100 border border-neutral-800'
                }`}
            >
              {message.parts.map((part, index) => {
                /* ---------------- TEXT ---------------- */
                if (part.type === 'text') {
                  return <span key={index}>{part.text}</span>;
                }

                /* ---------------- WEATHER TOOL ---------------- */
                if (part.type === 'tool-displayWeather') {
                  switch (part.state) {
                    case 'input-available':
                      return (
                        <div key={index} className="text-xs text-neutral-400">
                          Loading weather...
                        </div>
                      );

                    case 'output-available':
                      if ((part.input as { view: string }).view === 'forecast') {
                        console.log("Forecast Part");
                        const location = (part.input as { location: string }).location;
                        const result = part.output as { days: { date: string; condition: string; temperature: number }[] };
                        return (
                          <div key={index} className="mt-2 rounded-xl border border-neutral-700 bg-neutral-800 p-4">
                            <h3 className="mb-3 font-semibold text-neutral-200">3-Day Forecast for {location}</h3>
                            <div className="space-y-2">
                              {result.days?.map((day: any, i: number) => (
                                <div key={i} className="flex justify-between border-b border-neutral-700 pb-2 last:border-0 last:pb-0">
                                  <span>{day.date}</span>
                                  <span className="text-neutral-400">{day.condition}</span>
                                  <span className="font-mono">{day.temperature}°</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={index} className="mt-2">
                          <Weather {...part.output as WeatherProps} />
                        </div>
                      );

                    case 'output-error':
                      return (
                        <div key={index} className="text-red-400">
                          Error: {part.errorText}
                        </div>
                      );

                    default:
                      return null;
                  }
                }

                /* ---------------- TABLE TOOL ---------------- */
                if (part.type === 'tool-generateTable') {
                  switch (part.state) {
                    case 'input-available':
                      return (
                        <div key={index} className="text-xs text-neutral-400">
                          Generating table...
                        </div>
                      );

                    case 'output-available':
                      return (
                        <div key={index} className="mt-2">
                          <ResponseRenderer toolResult={part.output} />
                        </div>
                      );

                    case 'output-error':
                      return (
                        <div key={index} className="text-red-400">
                          Table error: {part.errorText}
                        </div>
                      );

                    default:
                      return null;
                  }
                }

                /* ---------------- CHART TOOL ---------------- */
                if (part.type === 'tool-generateChart') {
                  switch (part.state) {
                    case 'input-available':
                      return (
                        <div key={index} className="text-xs text-neutral-400">
                          Generating chart...
                        </div>
                      );

                    case 'output-available':
                      return (
                        <div key={index} className="mt-2">
                          <ResponseRenderer toolResult={part.output} />
                        </div>
                      );

                    case 'output-error':
                      return (
                        <div key={index} className="text-red-400">
                          Chart error: {part.errorText}
                        </div>
                      );

                    default:
                      return null;
                  }
                }

                /* ---------------- CARD TOOL ---------------- */
                if (part.type === 'tool-generateCard') {
                  switch (part.state) {
                    case 'input-available':
                      return (
                        <div key={index} className="text-xs text-neutral-400">
                          Generating summary card...
                        </div>
                      );

                    case 'output-available':
                      return (
                        <div key={index} className="mt-2">
                          <ResponseRenderer toolResult={part.output} />
                        </div>
                      );

                    case 'output-error':
                      return (
                        <div key={index} className="text-red-400">
                          Card error: {part.errorText}
                        </div>
                      );

                    default:
                      return null;
                  }
                }

                if (part.type === 'tool-generatePowerLossSimulator') {
                  switch (part.state) {
                    case 'input-available':
                      return (
                        <div key={index} className="text-xs text-neutral-400">
                          Generating summary card...
                        </div>
                      );

                    case 'output-available':
                      return (
                        <div key={index} className="mt-2">
                          <ResponseRenderer toolResult={part.output} />
                        </div>
                      );

                    case 'output-error':
                      return (
                        <div key={index} className="text-red-400">
                          Card error: {part.errorText}
                        </div>
                      );

                    default:
                      return null;
                  }
                }

                return null;
              })}
            </div>
          </div>
        ))}

        {/* {isLoading && (
          <div className="text-sm text-neutral-500">AI is typing...</div>
        )} */}
      </main>

      <form
        onSubmit={handleSubmit}
        className="border-t border-neutral-800 bg-neutral-900 p-4 flex gap-2"
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}





// 'use client';

// import { useChat } from '@ai-sdk/react';
// import { useState } from 'react';
// import { Weather } from '../../components/weather';

// export default function Page() {
//   const [input, setInput] = useState('');
//   const { messages, sendMessage, isLoading } = useChat();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     sendMessage({ text: input });
//     setInput('');
//   };

//   return (
//     <div className="flex h-screen flex-col bg-neutral-950 text-neutral-100">
      
//       <header className="border-b border-neutral-800 bg-neutral-900 px-4 py-3 font-semibold">
//         Generative UI POC
//       </header>

//       <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
//         {messages.map(message => (
//           <div
//             key={message.id}
//             className={`flex ${
//               message.role === 'user' ? 'justify-end' : 'justify-start'
//             }`}
//           >
//             <div
//               className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow
//                 ${
//                   message.role === 'user'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-neutral-900 text-neutral-100 border border-neutral-800'
//                 }`}
//             >
//               {message.parts.map((part, index) => {
//                 if (part.type === 'text') {
//                   return <span key={index}>{part.text}</span>;
//                 }

//                 if (part.type === 'tool-displayWeather') {
//                   switch (part.state) {
//                     case 'input-available':
//                       return (
//                         <div key={index} className="text-xs text-neutral-400">
//                           Loading weather...
//                         </div>
//                       );
//                     case 'output-available':
//                       return (
//                         <div key={index} className="mt-2">
//                           <Weather {...part.output} />
//                         </div>
//                       );
//                     case 'output-error':
//                       return (
//                         <div key={index} className="text-red-400">
//                           Error: {part.errorText}
//                         </div>
//                       );
//                     default:
//                       return null;
//                   }
//                 }

//                 return null;
//               })}
//             </div>
//           </div>
//         ))}

//         {isLoading && (
//           <div className="text-sm text-neutral-500">AI is typing...</div>
//         )}
//       </main>

//       <form
//         onSubmit={handleSubmit}
//         className="border-t border-neutral-800 bg-neutral-900 p-4 flex gap-2"
//       >
//         <input
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
//         />
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
