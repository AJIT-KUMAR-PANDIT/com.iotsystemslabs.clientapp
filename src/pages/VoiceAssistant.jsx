import React, { useState } from "react";
import { Mic, Loader, X } from "lucide-react";

function VoiceAssistant({ isBlackBg, label }) {
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartListening = () => {
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      setIsListening(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  return (
    <div className="voice-assistant-container flex flex-col items-center">
      {!isListening ? (
        <div
          className={`voice-assistant-btn ${
            isBlackBg ? "bg-white text-black" : "bg-black text-white"
          }`}
          onClick={handleStartListening}
        >
          {isLoading ? (
            <Loader className="animate-spin text-blue-500" size={36} />
          ) : (
            <Mic size={36} />
          )}
          <span className="tooltip">AI Assistant</span>
        </div>
      ) : (
        <div
          className={`voice-assistant-active ${
            isBlackBg ? "bg-red-400 text-white" : "bg-red-600 text-white"
          }`}
          onClick={handleStopListening}
        >
          <X size={36} />
          <span className="tooltip">Stop Listening</span>
        </div>
      )}

      {/* Dynamic Label */}
      <span
        className={`mt-2 text-sm font-bold ${
          isBlackBg ? "text-white" : "text-black"
        }`}
      >
        {label || "AI Voice"}
      </span>
    </div>
  );
}

export default VoiceAssistant;
