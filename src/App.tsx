// src/App.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Controls } from "./components/controls";
import { Table } from "./components/table";
import { drawCardsToPlayers, playRound } from "./game/war";
import type { WarCard } from "./game/warCards";

export const App: React.FC = () => {
    // --- 1. ניהול מצב המשחק (State) ---
    const [hands, setHands] = useState(() => drawCardsToPlayers());
    const player1Hand = hands.player1Hand;
    const player2Hand = hands.player2Hand;

    const [playedCard1, setPlayedCard1] = useState<WarCard | undefined>(undefined);
    const [playedCard2, setPlayedCard2] = useState<WarCard | undefined>(undefined);

    const [isWar, setIsWar] = useState<boolean>(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("המשחק הותחל! בהצלחה!");
    const [winner, setWinner] = useState<string | null>(null);

    /**
     * פונקציה לאיפוס המשחק
     */
    const handleResetGame = useCallback(() => {
        setHands(drawCardsToPlayers());
        setPlayedCard1(undefined);
        setPlayedCard2(undefined);
        setIsWar(false);
        setIsAutoPlaying(false);
        setWinner(null);
        setStatusMessage("המשחק הותחל! בהצלחה!");
    }, []);

    /**
     * פונקציה לביצוע סיבוב
     */
    const handlePlayRound = useCallback(() => {
        if (winner || player1Hand.length === 0 || player2Hand.length === 0) {
            return;
        }

        const topCard1 = player1Hand[0];
        const topCard2 = player2Hand[0];

        setPlayedCard1(topCard1);
        setPlayedCard2(topCard2);

        const result = playRound(player1Hand, player2Hand);

        setHands({
            player1Hand: result.player1Hand,
            player2Hand: result.player2Hand,
        });

        const isTie = topCard1.value === topCard2.value;
        setIsWar(isTie);

        if (isTie) {
            if (result.player1Hand.length > player1Hand.length) {
                setStatusMessage("⚔️ הייתה מלחמה! ניצחת בקרב ולקחת את הקופה!");
            } else {
                setStatusMessage("⚔️ הייתה מלחמה! המחשב ניצח בקרב ולקח את הקופה!");
            }
        } else if (topCard1.value > topCard2.value) {
            setStatusMessage("🎉 ניצחת בסיבוב הזה!");
        } else {
            setStatusMessage("💻 המחשב ניצח בסיבוב הזה!");
        }

        if (result.player1Hand.length === 0) {
            setWinner("מחשב");
            setStatusMessage("🏆 המחשב ניצח במשחק!");
            setIsAutoPlaying(false);
        } else if (result.player2Hand.length === 0) {
            setWinner("שחקן 1");
            setStatusMessage("🏆 ברכות! ניצחת במשחק!");
            setIsAutoPlaying(false);
        }
    }, [player1Hand, player2Hand, winner]);

    /**
     * מנגנון משחק אוטומטי
     */
    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;

        if (isAutoPlaying && !winner) {
            intervalId = setInterval(() => {
                handlePlayRound();
            }, 800);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isAutoPlaying, winner, handlePlayRound]);

    return (
        <div
            dir="rtl"
            className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-6 sm:py-10"
            style={{ background: "radial-gradient(ellipse at top, #0f2b22 0%, #050505 65%)" }}>
            <div className="w-full max-w-4xl flex flex-col items-center">
                {/* 1. כותרת והודעת סטטוס (בחלק העליון) */}
                <header className="text-center mb-5 sm:mb-7 flex flex-col items-center">
                    <h1
                        className="text-3xl sm:text-4xl font-bold tracking-wide"
                        style={{
                            color: "#e0c468",
                            fontFamily: "'Frank Ruhl Libre', Georgia, serif",
                        }}>
                        מלחמה{" "}
                        <span
                            className="text-xl sm:text-2xl font-normal"
                            style={{ color: "rgba(243,234,216,0.5)" }}>
                            War
                        </span>
                    </h1>
                    <div
                        className="mt-3 px-4 py-2 rounded-full flex items-center justify-center"
                        style={{
                            background: "rgba(0,0,0,0.4)",
                            boxShadow: "0 0 0 1px rgba(201,162,39,0.3)",
                            minHeight: "2.25rem",
                        }}>
                        <p
                            className="text-sm sm:text-base font-medium"
                            style={{ color: "#f3ead8" }}>
                            {statusMessage}
                        </p>
                    </div>
                </header>

                {/* 2. שולחן המשחק (במרכז) */}
                <main className="w-full">
                    <Table
                        player1Card={playedCard1}
                        player2Card={playedCard2}
                        player1DeckCount={player1Hand.length}
                        player2DeckCount={player2Hand.length}
                        isWar={isWar}
                        warPotCount={0}
                    />
                </main>

                {/* 3. כפתורי השליטה (בתחתית) */}
                <footer className="mt-6 sm:mt-8">
                    <Controls
                        onPlayRound={handlePlayRound}
                        onReset={handleResetGame}
                        isGameOver={!!winner}
                        isAutoPlaying={isAutoPlaying}
                        onToggleAutoPlay={() => setIsAutoPlaying((prev) => !prev)}
                    />
                </footer>
            </div>
        </div>
    );
};

export default App;
