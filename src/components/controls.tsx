// src/components/Controls.tsx
import React from "react";

interface ControlsProps {
    onPlayRound: () => void;
    onReset: () => void;
    isGameOver: boolean;
    isAutoPlaying: boolean;
    onToggleAutoPlay: () => void;
}

/**
 * קומפוננטת Controls - כפתורי השליטה במשחק
 */
export const Controls: React.FC<ControlsProps> = ({
    onPlayRound,
    onReset,
    isGameOver,
    isAutoPlaying,
    onToggleAutoPlay,
}) => {
    const playDisabled = isGameOver || isAutoPlaying;

    return (
        <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center">
            {/* כפתור לשחק סיבוב בודד */}
            <button
                onClick={onPlayRound}
                disabled={playDisabled}
                className="px-6 py-3 rounded-full font-bold transition active:scale-95 hover:brightness-105 cursor-pointer disabled:cursor-not-allowed"
                style={{
                    color: playDisabled ? "#d1d5db" : "#2e1a08",
                    background: playDisabled
                        ? "linear-gradient(to bottom, #6b7280, #4b5563)"
                        : "linear-gradient(to bottom, #e0c468, #c9a227)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                }}>
                שחק סיבוב 🃏
            </button>

            {/* כפתור למצב משחק אוטומטי */}
            <button
                onClick={onToggleAutoPlay}
                disabled={isGameOver}
                className="px-6 py-3 rounded-full font-bold transition active:scale-95 hover:brightness-110 cursor-pointer disabled:cursor-not-allowed"
                style={{
                    color: "#f3ead8",
                    opacity: isGameOver ? 0.5 : 1,
                    background: isAutoPlaying
                        ? "linear-gradient(to bottom, #a53232, #7a1f1f)"
                        : "linear-gradient(to bottom, #2f5f8a, #1e3a5f)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                }}>
                {isAutoPlaying ? "עצור משחק אוטומטי ⏹️" : "משחק אוטומטי ▶️"}
            </button>

            {/* כפתור איפוס / משחק חדש */}
            <button
                onClick={onReset}
                className="px-6 py-3 rounded-full font-bold transition active:scale-95 hover:brightness-125 cursor-pointer"
                style={{
                    color: "#f3ead8",
                    background: "#1a1a1a",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,162,39,0.3)",
                }}>
                משחק חדש 🔄
            </button>
        </div>
    );
};
