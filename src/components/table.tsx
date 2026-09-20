// src/components/table.tsx
import React from "react";

import type { WarCard } from "../game/warCards";
import Card from "./card";

interface TableProps {
    player1Card?: WarCard;
    player2Card?: WarCard;
    player1DeckCount: number;
    player2DeckCount: number;
    isWar?: boolean;
    warPotCount?: number;
}

const PlayedSlot: React.FC<{ card?: WarCard }> = ({ card }) => (
    <div className="flex flex-col items-center gap-1.5">
        <span
            className="tracking-wide"
            style={{ fontSize: "10px", color: "rgba(224,196,104,0.7)" }}>
            קלף משוחק
        </span>
        {card ? (
            <Card card={card} />
        ) : (
            <div
                className="w-20 h-28 sm:w-24 sm:h-36 rounded-lg flex items-center justify-center"
                style={{
                    border: "1px dashed rgba(201,162,39,0.3)",
                    background: "rgba(0,0,0,0.1)",
                    color: "rgba(224,196,104,0.5)",
                    fontSize: "11px",
                }}>
                ממתין
            </div>
        )}
    </div>
);

export const Table = (props: TableProps) => {
    const {
        player1Card,
        player2Card,
        player1DeckCount,
        player2DeckCount,
        isWar = false,
        warPotCount = 0,
    } = props;

    return (
        // מסגרת עץ/פליז חיצונית
        <div
            className="relative w-full p-1.5"
            style={{
                borderRadius: "28px",
                background: "linear-gradient(to bottom, #6b4423, #4a2c12, #2e1a08)",
                boxShadow: "0 20px 45px rgba(0,0,0,0.55)",
            }}>
            {/* משטח הלבד */}
            <div
                className="relative w-full px-4 py-6 sm:px-8 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-6"
                style={{
                    borderRadius: "24px",
                    background:
                        "radial-gradient(ellipse at center, #10513f 0%, #0b3d2e 55%, #062018 100%)",
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.3)",
                }}>
                {/* שחקן 1 */}
                <div
                    className="flex items-center gap-4 px-4 py-3 w-full md:w-auto justify-center"
                    style={{
                        borderRadius: "16px",
                        background: "rgba(0,0,0,0.2)",
                        boxShadow: "inset 0 0 0 1px rgba(201,162,39,0.2)",
                    }}>
                    <div className="flex flex-col items-center gap-1.5">
                        <span
                            className="text-xs sm:text-sm font-semibold"
                            style={{ color: "#f3ead8" }}>
                            אתה
                        </span>
                        <div className="relative">
                            <Card isFaceDown={player1DeckCount > 0} />
                            <span
                                className="absolute -top-2 -right-2 font-bold rounded-full w-6 h-6 flex items-center justify-center"
                                style={{
                                    fontSize: "11px",
                                    background: "#1e3a5f",
                                    color: "#f3ead8",
                                    boxShadow: "0 0 0 1px rgba(201,162,39,0.6)",
                                }}>
                                {player1DeckCount}
                            </span>
                        </div>
                    </div>
                    <PlayedSlot card={player1Card} />
                </div>

                {/* מרכז - VS / מלחמה */}
                <div className="flex flex-col items-center justify-center gap-2 shrink-0">
                    {isWar ? (
                        <div
                            className="flex flex-col items-center gap-1 px-4 py-2"
                            style={{
                                borderRadius: "12px",
                                background: "linear-gradient(to bottom, #a53232, #7a1f1f)",
                                boxShadow:
                                    "0 0 0 1px rgba(224,196,104,0.6), 0 4px 10px rgba(0,0,0,0.4)",
                            }}>
                            <span
                                className="text-sm sm:text-base font-bold tracking-wide"
                                style={{ color: "#f3ead8" }}>
                                ⚔️ מלחמה!
                            </span>
                            {warPotCount > 0 && (
                                <span style={{ fontSize: "10px", color: "#e0c468" }}>
                                    קופה: {warPotCount}
                                </span>
                            )}
                        </div>
                    ) : (
                        <div
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                            style={{
                                background: "#0b3d2e",
                                boxShadow:
                                    "0 0 0 2px rgba(201,162,39,0.7), inset 0 2px 6px rgba(0,0,0,0.5)",
                            }}>
                            <span
                                className="text-lg sm:text-xl font-bold"
                                style={{
                                    color: "#e0c468",
                                    fontFamily: "'Frank Ruhl Libre', Georgia, serif",
                                }}>
                                VS
                            </span>
                        </div>
                    )}
                </div>

                {/* שחקן 2 - מחשב */}
                <div
                    className="flex items-center gap-4 px-4 py-3 w-full md:w-auto justify-center"
                    style={{
                        borderRadius: "16px",
                        background: "rgba(0,0,0,0.2)",
                        boxShadow: "inset 0 0 0 1px rgba(201,162,39,0.2)",
                    }}>
                    <PlayedSlot card={player2Card} />
                    <div className="flex flex-col items-center gap-1.5">
                        <span
                            className="text-xs sm:text-sm font-semibold"
                            style={{ color: "#f3ead8" }}>
                            מחשב
                        </span>
                        <div className="relative">
                            <Card isFaceDown={player2DeckCount > 0} />
                            <span
                                className="absolute -top-2 -right-2 font-bold rounded-full w-6 h-6 flex items-center justify-center"
                                style={{
                                    fontSize: "11px",
                                    background: "#1e3a5f",
                                    color: "#f3ead8",
                                    boxShadow: "0 0 0 1px rgba(201,162,39,0.6)",
                                }}>
                                {player2DeckCount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
