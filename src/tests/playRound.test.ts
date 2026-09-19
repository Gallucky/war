import { describe, test, expect, vi } from "vitest";
import { playRound } from "../game/war";
import type { WarCardDeck } from "../game/deck";

// Define type inline to make the test suite completely standalone
interface WarCard {
    type: string;
    value: number;
}

// Helper function to build card objects easily
const card = (
    value: number,
    type: "hearts" | "spades" | "clubs" | "diamonds" | "joker-black" | "joker-red" = "hearts",
): WarCard => ({ type, value });

describe("playRound - Standalone Vitest Tests", () => {
    test("Player 1 wins a standard round when card value is higher", () => {
        const player1Hand = [card(10), card(5)] as WarCardDeck;
        const player2Hand = [card(4), card(2)] as WarCardDeck;

        const result = playRound(player1Hand, player2Hand);

        // Player 1 keeps remaining card (5) and gains both played cards (10 and 4) at the bottom
        expect(result.player1Hand).toEqual([card(5), card(10), card(4)]);

        // Player 2 loses top card (4)
        expect(result.player2Hand).toEqual([card(2)]);
    });

    test("Player 2 wins a standard round when card value is higher", () => {
        const player1Hand = [card(3), card(8)] as WarCardDeck;
        const player2Hand = [card(9), card(2)] as WarCardDeck;

        const result = playRound(player1Hand, player2Hand);

        // Player 1 loses top card
        expect(result.player1Hand).toEqual([card(8)]);

        // Player 2 keeps remaining card and takes both played cards
        expect(result.player2Hand).toEqual([card(2), card(3), card(9)]);
    });

    test("War Scenario: Equal top cards trigger war, draw 3 face-down, 2nd pair resolves winner", () => {
        // Player 1: [10 (tie), 1, 2, 3 (face down), 9 (wins resolution), 7 (remaining)]
        const player1Hand = [card(10), card(1), card(2), card(3), card(9), card(7)] as WarCardDeck;

        // Player 2: [10 (tie), 4, 5, 6 (face down), 2 (loses resolution), 8 (remaining)]
        const player2Hand = [card(10), card(4), card(5), card(6), card(2), card(8)] as WarCardDeck;

        const result = playRound(player1Hand, player2Hand);

        // Player 1 should win the round and take all 10 cards involved in the war
        expect(result.player1Hand.length).toBe(11); // 1 remaining + 10 won cards
        expect(result.player1Hand[0]).toEqual(card(7)); // Top card is the unplayed remaining card

        // Player 2 is left with only their 1 unplayed remaining card
        expect(result.player2Hand).toEqual([card(8)]);
    });

    test("War Edge Case: Player runs out of cards during war setup", () => {
        // Player 1 has only 2 cards total (1 for initial draw, 1 for war face-down)
        const player1Hand = [card(10), card(5)] as WarCardDeck;
        const player2Hand = [card(10), card(1), card(2), card(3), card(7)] as WarCardDeck;

        const result = playRound(player1Hand, player2Hand);

        // Player 1 ran out of cards completely
        expect(result.player1Hand).toEqual([]);

        // Player 2 receives the whole pot and survives
        expect(result.player2Hand.length).toBeGreaterThan(0);
    });

    test("Immutability Test: Original input arrays are not mutated", () => {
        const p1Hand = [card(8), card(2)] as WarCardDeck;
        const p2Hand = [card(4), card(9)] as WarCardDeck;

        const p1Snapshot = JSON.stringify(p1Hand);
        const p2Snapshot = JSON.stringify(p2Hand);

        playRound(p1Hand, p2Hand);

        // Original arrays must match their original state before execution
        expect(JSON.stringify(p1Hand)).toBe(p1Snapshot);
        expect(JSON.stringify(p2Hand)).toBe(p2Snapshot);
    });

    test("Guard Clause: Emits warning and returns hands intact if a player starts with no cards", () => {
        const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

        const player1Hand: WarCardDeck = [];
        const player2Hand = [card(5)] as WarCardDeck;

        const result = playRound(player1Hand, player2Hand);

        expect(result.player1Hand).toEqual([]);
        expect(result.player2Hand).toEqual(player2Hand);
        expect(consoleSpy).toHaveBeenCalledWith(
            "One of the players has no cards left. The game is over.",
        );
    });
});
