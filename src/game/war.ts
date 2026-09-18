import { createWarCardDeck, shuffleDeck, type WarCardDeck } from "./deck";
import type { WarCard } from "./warCards";

const playWar = () => {
    const deck = createWarCardDeck(true);
    const shuffledDeck = shuffleDeck(deck);

    return {
        player1Hand: shuffledDeck.slice(0, shuffledDeck.length / 2) as WarCardDeck,
        player2Hand: shuffledDeck.slice(shuffledDeck.length / 2) as WarCardDeck,
    };
};

const compareCards = (card1: WarCard, card2: WarCard) => {
    if (card1.value > card2.value) {
        return 1; // Player 1 wins
    } else if (card1.value < card2.value) {
        return -1; // Player 2 wins
    }
    return 0; // It's a tie - war.
};

export type GameState = {
    readonly player1Hand: WarCardDeck;
    readonly player2Hand: WarCardDeck;
    readonly pot: WarCardDeck;
    readonly isGameOver: boolean;
    readonly winner: "player1" | "player2" | null;
};
