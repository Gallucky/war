# 🃏 War Card Game

A modern, type-safe implementation of the classic **War** card game built with **React**, **TypeScript**, and **Vite**.

This project prioritizes manual functional game logic, total data immutability, strong TypeScript type safety, and zero external game-engine dependencies.

---

## 🚀 Key Features & Architectural Principles

- **Strict Type Safety:** Comprehensive Discriminated Union definitions for all card suits, values, standard ranks, and distinct Joker types.
- **Immutability First:** Enforced `readonly` arrays and standard spread patterns (`[...deck]`, `slice`) to guarantee zero side effects during round and game state mutations.
- **Pure Game Logic & War Engine:** Standalone `playRound` evaluator and recursive War mechanics separated entirely from React's render loop.
- **Graceful Edge-Case Handling:** Manages scenarios where players run out of cards mid-war by awarding accumulated pots to the surviving player.
- **Dynamic Card UI:** Visual representation powered by `@letele/playing-cards` (CC0/Public Domain).
- **Themed, Responsive UI:** Casino-table visual design (felt surface, wood/brass rail, gold accents) with a mobile-first responsive layout and RTL Hebrew support.
- **Comprehensive Unit Testing:** Covered by a **Vitest** test suite verifying deck creation, distribution logic, round wins, recursive war resolutions, and immutability.

---

## 🛠️ Tech Stack

- **Framework:** React 18 / 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Testing:** Vitest
- **Card Graphics:** `@letele/playing-cards`

---

## 📂 Project Structure

```txt
war-card-game/
├── src/
│   ├── types/
│   │   └── cards.ts         # WarCard, WarCardValue, Joker, and Hand types
│   ├── logic/
│   │   ├── deck.ts          # Deck creation, Fisher-Yates shuffle, and deal logic
│   │   └── playRound.ts     # Pure, immutable War round and tie resolution engine
│   ├── components/          # React UI components (Card, Table, Controls)
│   ├── App.tsx
│   └── index.css            # Tailwind entry point + theme variables
├── tests/
│   ├── deck.test.ts         # Unit tests for core deck logic
│   └── playRound.test.ts    # Standalone unit tests for playRound, wars, and card depletion
├── postcss.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js:** v18.0.0 or higher
- **npm** or **pnpm**

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/YOUR_USERNAME/war-card-game.git
    cd war-card-game
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm run dev
    ```

4. **Run the unit tests:**
    ```bash
    npm run test
    ```

---

## 📝 Commit & Development History

This section documents the step-by-step progress and architectural milestones of the project.

### Phase 1: Foundations & Core Logic Setup

- **`feat: project setup & initial build tooling`**
    - Configured React + TypeScript + Vite environment.
    - Resolved build and pathing environments.
- **`feat: card type system`**
    - Implemented strong discriminated unions for standard suit cards (`hearts`, `spades`, `clubs`, `diamonds`).
    - Added support for `joker-red` and `joker-black` variants evaluated with a uniform comparison `value: 15`.
- **`feat: fisher-yates shuffle & test suite`**
    - Written pure function for Fisher-Yates deck shuffling ensuring uniform distribution.
    - Set up **Vitest** testing suite for isolated logic assertions.
- **`feat: dynamic card dealing logic`**
    - Created `playWar`/`dealCards` utilities supporting dynamic deck lengths (52 standard or 54 with Jokers).
    - Ensured split hands return strictly typed `readonly` hands.

### Phase 2: Game State & War Resolution

- **`feat(game-logic): refactor playRound to be pure & immutable with Vitest suite`**
    - Refactored `playRound` to use immutable array patterns (`slice`, spread operators), preventing side-effect mutations during recursive war calls.
    - Implemented recursive tie resolution drawing 3 face-down cards into the war pot.
    - Added edge-case logic for pot distribution when a player runs out of cards mid-war.
    - Created standalone `playRound.test.ts` suite covering standard wins, ties, card depletion, and immutability checks.
- **`feat: react state integration`**
    - Hooked up functional core logic to UI card renderers using `@letele/playing-cards`.
    - Lazy state initialization (`useState(() => drawCardsToPlayers())`) to avoid `react-hooks/set-state-in-effect` warnings from resetting on mount.
    - Replaced `NodeJS.Timeout` typing with `ReturnType<typeof setInterval>` for browser-runtime compatibility with the auto-play interval.

### Phase 3: UI Redesign & Build Pipeline Fixes

- **`fix(layout): stabilize responsive table layout`**
    - Restructured `App.tsx` into a clean vertical stack (header / table / controls).
    - Fixed `Table.tsx` collapsing into a single squished horizontal line by correcting flex containers (`flex-col md:flex-row`) and adding overflow constraints.
- **`feat(ui): casino-table visual redesign`**
    - Reworked `App.tsx`, `Table.tsx`, `Controls.tsx`, and `Card.tsx` around a felt-table theme: wood/brass rail frame, gold-accented typography, chip-style buttons, and a redesigned war/VS indicator.
    - Added RTL-aware layout and a serif Hebrew display font for the title.
- **`fix(build): repair broken Tailwind pipeline`**
    - Diagnosed and fixed a fully non-functional Tailwind build: `index.css` was missing the Tailwind entry directive, and `postcss.config.js` didn't exist, so no utility classes were ever generated.
    - Migrated the project to **Tailwind CSS v4**: swapped the deprecated in-package PostCSS plugin for `@tailwindcss/postcss`, and replaced the `@tailwind base/components/utilities` directives with `@import "tailwindcss";` in `index.css`.
    - Removed a legacy `#root` width/border rule from a starter template that was conflicting with the new full-bleed layout.
- **`chore: Tailwind IntelliSense setup`**
    - Installed the `Tailwind CSS IntelliSense` VS Code extension and configured `.vscode/settings.json` for TSX/JSX class-name autocomplete.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). Card assets courtesy of `@letele/playing-cards` (CC0 / Public Domain).
