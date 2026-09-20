// src/types/playing-cards.d.ts

declare module "@letele/playing-cards" {
    import React from "react";

    // 1. הגדרת הטיפוס עבור רכיב קלף בודד (רכיב SVG של React)
    export type CardComponent = React.FC<React.SVGProps<SVGSVGElement>>;

    // 2. הגדרת ממשק האובייקט: כל מפתח טקסטואלי ([key: string]) מחזיר רכיב קלף
    interface PlayingCardsModule {
        [key: string]: CardComponent;
    }

    // 3. יצירת האובייקט וייצוא שלו עבור המודול
    const cards: PlayingCardsModule;
    export = cards;
}
