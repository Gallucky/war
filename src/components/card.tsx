import React from "react";
import * as deck from "@letele/playing-cards";
import type { WarCard } from "../game/warCards";

type CardProps = {
    card?: WarCard;
    isFaceDown?: boolean;
    className?: string;
};

const getCardKey = (card: WarCard) => {
    // convert card to key string for rendering
    // jokers are special cases
    if (card.type === "joker-red") {
        return "J1";
    } else if (card.type === "joker-black") {
        return "J2";
    }

    // mapping of suit
    const suitMap: Record<string, string> = {
        hearts: "H",
        diamonds: "D",
        clubs: "C",
        spades: "S",
    };

    // mapping of rank
    const rankMap: Record<number, string> = {
        14: "a",
        13: "k",
        12: "q",
        11: "j",
    };

    // get the initials for suit and rank
    const suitInitial = suitMap[card.type];
    // if the rank is not in the map, use the value number as string
    const rankInitial = rankMap[card.value] || card.value.toString();

    // combine the initials to get the card key
    return `${suitInitial}${rankInitial}`;
};

const Card = (props: CardProps) => {
    const { card, isFaceDown, className = "" } = props;

    // If the card is face down, render the back with a subtle stacked-deck edge
    if (isFaceDown || !card) {
        const BackCardComponent = deck["B1"];
        return (
            <div
                className={`w-20 h-28 sm:w-24 sm:h-36 rounded-lg overflow-hidden ${className}`}
                style={{
                    border: "1px solid rgba(201,162,39,0.4)",
                    boxShadow: "0 1px 0 #c9a227, 0 2px 0 #0b0b0b, 0 6px 14px rgba(0,0,0,0.55)",
                }}>
                <BackCardComponent style={{ width: "100%", height: "100%" }} />
            </div>
        );
    }

    const cardKey = getCardKey(card) as keyof typeof deck;
    const CardComponent = deck[cardKey] || deck["B1"];

    return (
        <div
            className={`w-20 h-28 sm:w-24 sm:h-36 rounded-lg overflow-hidden bg-white ${className}`}
            style={{
                border: "1px solid rgba(0,0,0,0.1)",
                boxShadow: "0 10px 18px rgba(0,0,0,0.45)",
            }}>
            <CardComponent style={{ width: "100%", height: "100%" }} />
        </div>
    );
};

export default Card;
