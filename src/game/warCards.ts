type Ace = 14;
type King = 13;
type Queen = 12;
type Jack = 11;

export type WarCardValue = Ace | King | Queen | Jack | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2;

export type Joker = {
    type: "joker-red" | "joker-black";
    value: 15;
};

export type WarCard =
    | {
          type: "hearts" | "spades" | "clubs" | "diamonds";
          value: WarCardValue;
      }
    | Joker;
