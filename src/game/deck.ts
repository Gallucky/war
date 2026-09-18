import type { WarCard, WarCardValue } from "./warCards";

export type WarCardDeck = WarCard[];

export const createWarCardDeck = (withJokers: boolean = false): WarCardDeck => {
    const suits = ["hearts", "diamonds", "clubs", "spades"] as const;
    const deck: WarCardDeck = [];

    suits.forEach((suit) => {
        for (let value = 2; value <= 14; value++) {
            const card: WarCard = {
                type: suit,
                value: value as WarCardValue,
            };
            deck.push(card);
        }
    });

    if (withJokers) {
        deck.push({ type: "joker-black", value: 15 });
        deck.push({ type: "joker-red", value: 15 });
    }

    return deck;
};

export const shuffleDeck = (deck: WarCardDeck): WarCardDeck => {
    // Fisher-Yates shuffle algorithm
    // Pointing to the last index of the deck array.
    let lastIndex = deck.length - 1;

    const shuffledDeck = [...deck];

    // While the last index of the unshuffled part of the deck is greater than 0, we will continue to shuffle.
    while (lastIndex > 0) {
        // Generate a random index between 0 and the last index of the unshuffled part of the deck.
        // The plus 1 is for the Math.random() function to include the last index in the range of possible random values.
        const randomIndex = Math.floor(Math.random() * (lastIndex + 1));

        // Then we will swap the values / cards at the last index with the random value index.
        const temp = shuffledDeck[lastIndex];
        shuffledDeck[lastIndex] = shuffledDeck[randomIndex];
        shuffledDeck[randomIndex] = temp;

        // After the swap, we will decrement the last index to move the random index swapped to the shuffled part of the array/deck.
        lastIndex--;
    }

    // Returning the shuffled deck.
    return shuffledDeck;
};
