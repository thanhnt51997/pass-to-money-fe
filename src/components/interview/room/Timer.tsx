'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export default function Timer() {
    // This is a dummy timer for now.
    // In real implementation, we should sync with start_time from store/backend
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds: number) => {
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 font-mono text-sm">
            <Clock size={14} />
            <span>{formatTime(seconds)}</span>
        </div>
    );
}
