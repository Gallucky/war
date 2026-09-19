import { createWarCardDeck, shuffleDeck, type WarCardDeck } from "./deck";
import type { WarCard } from "./warCards";

export const drawCardsToPlayers = () => {
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

export const playRound = (
    player1Hand: WarCardDeck,
    player2Hand: WarCardDeck,
    pot: WarCardDeck = [],
): { player1Hand: WarCardDeck; player2Hand: WarCardDeck } => {
    if (player1Hand.length === 0 || player2Hand.length === 0) {
        console.warn("One of the players has no cards left. The game is over.");
        return { player1Hand, player2Hand };
    }

    const initialPlayer1Hand = [...player1Hand];
    const initialPlayer2Hand = [...player2Hand];

    const card1 = initialPlayer1Hand.shift() as WarCard;
    const card2 = initialPlayer2Hand.shift() as WarCard;

    console.log(`Card 1: ${card1.type} ${card1.value} vs Card 2: ${card2.type} ${card2.value}`);

    const result = compareCards(card1, card2);

    if (result === 1) {
        console.log("Player 1 wins the round.");
        return {
            player1Hand: [...initialPlayer1Hand, card1, card2, ...pot],
            player2Hand: initialPlayer2Hand,
        };
    } else if (result === -1) {
        console.log("Player 2 wins the round.");
        return {
            player1Hand: initialPlayer1Hand,
            player2Hand: [...initialPlayer2Hand, card1, card2, ...pot],
        };
    } else {
        console.log("It's a war!");
        const warPot = [...pot, card1, card2];

        // Each player draws three cards face down and one card face up
        const player1WarCards = [
            initialPlayer1Hand.shift(),
            initialPlayer1Hand.shift(),
            initialPlayer1Hand.shift(),
        ].filter((item) => item !== undefined) as WarCard[];
        const player2WarCards = [
            initialPlayer2Hand.shift(),
            initialPlayer2Hand.shift(),
            initialPlayer2Hand.shift(),
        ].filter((item) => item !== undefined) as WarCard[];

        // Adding the three face-down cards to the pot
        warPot.push(...player1WarCards, ...player2WarCards);

        // Returning the result of next round with the updated hands and the war pot,
        // The face-up cards will be drawn in the next round, and the winner will take all cards in the war pot
        return playRound(initialPlayer1Hand, initialPlayer2Hand, warPot);
    }
};

export type GameState = {
    readonly player1Hand: WarCardDeck;
    readonly player2Hand: WarCardDeck;
    readonly pot: WarCardDeck;
    readonly isGameOver: boolean;
    readonly winner: "player1" | "player2" | null;
};
