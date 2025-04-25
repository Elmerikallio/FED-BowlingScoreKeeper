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

function BowlingProvider({ children }) {
    const [players, setPlayers] = useState([]);
    const [matchSize, setMatchSize] = useState(3);
    const [currentGame, setCurrentGame] = useState(1);
    const [scores, setScores] = useState({}); // { playerName: [{ frame: 1, score: 20 }, ...] }
  
    const addPlayer = (name) => {
      if (players.length >= 4) return;
      setPlayers((prev) => [...prev, name]);
      setScores((prev) => ({ ...prev, [name]: [] }));
    };

    const updateScore = (player, frame, score) => {
        setScores((prev) => {
          const playerScores = prev[player] || [];
          const updatedScores = [...playerScores];
          updatedScores[frame - 1] = { frame, score };
          return { ...prev, [player]: updatedScores };
        });
      };