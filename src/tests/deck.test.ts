import { describe, expect, it } from "vitest";
import { createWarCardDeck, shuffleDeck } from "../game/deck";
import { drawCardsToPlayers, playRound } from "../game/war";

describe("Deck Logic", () => {
    it("should create a deck of 52 cards", () => {
        console.log("=== Test #1 ===");
        const deck = createWarCardDeck();
        expect(deck).toHaveLength(52);

        console.log("Original Deck:");
        console.table(deck);
    });

    it("should shuffle the deck without losing cards", () => {
        console.log("=== Test #2 ===");
        const deck = createWarCardDeck();
        const shuffled = shuffleDeck(deck);

        console.log("Original Deck:");
        console.table(deck);

        expect(shuffled).toHaveLength(52);
        // Ensure it returned a new array (Immutability)
        expect(shuffled).not.toBe(deck);

        console.log("Shuffled Deck:");
        console.table(shuffled);
    });

    it("should create a deck of 54 cards when jokers are included", () => {
        console.log("=== Test #3 ===");
        const deckWithJokers = createWarCardDeck(true);
        expect(deckWithJokers).toHaveLength(54);

        console.log("Deck with Jokers:");
        console.table(deckWithJokers);
    });

    it("should shuffle the deck with jokers without losing cards", () => {
        console.log("=== Test #4 ===");
        const deckWithJokers = createWarCardDeck(true);
        const shuffled = shuffleDeck(deckWithJokers);

        console.log("Deck with Jokers:");
        console.table(deckWithJokers);

        console.log("Shuffled Deck:");
        console.table(shuffled);
    });

    it("should play a round of the game and determine the winner", () => {
        console.log("=== Test #5 ===");

        let { player1Hand, player2Hand } = drawCardsToPlayers();

        const { player1HandBefore, player2HandBefore } = {
            player1HandBefore: player1Hand,
            player2HandBefore: player2Hand,
        };

        console.log(`Player 1 Hand [Length: ${player1HandBefore.length}]:`);
        console.log(player1HandBefore);
        console.log(`Player 2 Hand [Length: ${player2HandBefore.length}]:`);
        console.log(player2HandBefore);

        const roundResult = playRound(player1Hand, player2Hand);

        player1Hand = roundResult.player1Hand;
        player2Hand = roundResult.player2Hand;

        console.log(`Player 1 Hand [Length: ${player1Hand.length}]:`);
        console.log(player1Hand);
        console.log(`Player 2 Hand [Length: ${player2Hand.length}]:`);
        console.log(player2Hand);
    });
});
