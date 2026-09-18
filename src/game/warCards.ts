// type WarCardValue =
//     | {
//           rankName: "Ace";
//           value: 14;
//       }
//     | {
//           rankName: "King";
//           value: 13;
//       }
//     | {
//           rankName: "Queen";
//           value: 12;
//       }
//     | {
//           rankName: "Jack";
//           value: 11;
//       }
//     | {
//           rankName: "Ten";
//           value: 10;
//       }
//     | {
//           rankName: "Nine";
//           value: 9;
//       }
//     | {
//           rankName: "Eight";
//           value: 8;
//       }
//     | {
//           rankName: "Seven";
//           value: 7;
//       }
//     | {
//           rankName: "Six";
//           value: 6;
//       }
//     | {
//           rankName: "Five";
//           value: 5;
//       }
//     | {
//           rankName: "Four";
//           value: 4;
//       }
//     | {
//           rankName: "Three";
//           value: 3;
//       }
//     | {
//           rankName: "Two";
//           value: 2;
//       };

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
