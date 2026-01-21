'use client';

import React, { useState } from 'react';
import { Mic, Square, Play, Pause, Upload } from 'lucide-react';

interface VoiceRecorderProps {
    onRecordingComplete?: (audioUrl: string) => void;
    disabled?: boolean;
}

/**
 * VoiceRecorder Component
 * Placeholder UI for voice recording
 * TODO: Implement actual recording with MediaRecorder API
 */
export function VoiceRecorder({ onRecordingComplete, disabled }: VoiceRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [hasRecording, setHasRecording] = useState(false);

    const handleStartRecording = () => {
        // TODO: Implement MediaRecorder
        setIsRecording(true);
        setRecordingTime(0);
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        setHasRecording(true);
        // TODO: Save recording and call onRecordingComplete
    };

    const handleTogglePause = () => {
        setIsPaused(!isPaused);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-4">
            {/* Recording Controls */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex flex-col items-center gap-6">
                    {/* Waveform Visualization (Placeholder) */}
                    <div className="flex h-24 w-full items-center justify-center gap-1">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className={`
                  w-1 rounded-full bg-cyan-500 transition-all
                  ${isRecording && !isPaused ? 'animate-pulse' : ''}
                `}
                                style={{
                                    height: `${Math.random() * 60 + 20}%`,
                                    opacity: isRecording ? 1 : 0.3,
                                }}
                            />
                        ))}
                    </div>

                    {/* Timer */}
                    <div className="text-2xl font-mono text-white">
                        {formatTime(recordingTime)}
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center gap-4">
                        {!isRecording ? (
                            <button
                                onClick={handleStartRecording}
                                disabled={disabled}
                                className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white transition-all hover:bg-red-600 active:scale-95 disabled:opacity-50"
                            >
                                <Mic className="h-6 w-6" />
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleTogglePause}
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
                                >
                                    {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                                </button>

                                <button
                                    onClick={handleStopRecording}
                                    className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white transition-all hover:bg-red-600 active:scale-95"
                                >
                                    <Square className="h-6 w-6" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Status */}
                    <div className="text-sm text-gray-400">
                        {isRecording
                            ? isPaused
                                ? 'Recording paused'
                                : 'Recording...'
                            : hasRecording
                                ? 'Recording complete'
                                : 'Click to start recording'}
                    </div>
                </div>
            </div>

            {/* Upload Button (if has recording) */}
            {hasRecording && (
                <button
                    onClick={() => onRecordingComplete?.('placeholder-audio-url')}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 py-3 font-medium text-black transition-all hover:bg-cyan-400 active:scale-[0.98]"
                >
                    <Upload className="h-5 w-5" />
                    Upload Recording
                </button>
            )}

            {/* Placeholder Notice */}
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3 text-center text-xs text-yellow-400">
                ⚠️ Voice recording is a placeholder. Actual implementation requires MediaRecorder API.
            </div>
        </div>
    );
}
