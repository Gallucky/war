import { describe, expect, it } from "vitest";
import { createWarCardDeck, shuffleDeck } from "../game/deck";

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
});
