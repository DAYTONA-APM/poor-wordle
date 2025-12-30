import { useEffect, useState } from 'react';

export const Timer = ({ onTimeUp }: { onTimeUp: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="text-2xl font-mono font-bold mb-4 flex items-center gap-2">
      <span className={timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-gray-700'}>
        ⏱ {timeLeft}s
      </span>
    </div>
  );
};