import React, { createContext, useContext, useState } from "react";

const BowlingContext = createContext();

export default function App() {
  return (
    <BowlingProvider>
      <div className="app">
        <h1>Bowling Score Keeper 🎳</h1>
        <GameSetup />
        <ScoreBoard />
      </div>
    </BowlingProvider>
  );
}