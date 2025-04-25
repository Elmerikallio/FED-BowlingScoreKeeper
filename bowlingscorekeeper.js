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

      const resetGame = () => {
        setCurrentGame((g) => g + 1);
        setScores((prev) => {
          const reset = {};
          players.forEach((p) => (reset[p] = []));
          return reset;
        });
      };
    
      const value = {
        players,
        addPlayer,
        matchSize,
        setMatchSize,
        scores,
        updateScore,
        currentGame,
        resetGame,
      };
    
      return <BowlingContext.Provider value={value}>{children}</BowlingContext.Provider>;
    }
    function GameSetup() {
        const { players, addPlayer, matchSize, setMatchSize } = useContext(BowlingContext);
        const [newPlayer, setNewPlayer] = useState("");
      
        const handleAdd = () => {
          if (newPlayer.trim()) {
            addPlayer(newPlayer.trim());
            setNewPlayer("");
          }
        };

        return (
            <div className="setup">
              <h2>Setup</h2>
              <input
                value={newPlayer}
                onChange={(e) => setNewPlayer(e.target.value)}
                placeholder="Player name"
              />
              <button onClick={handleAdd}>Add Player</button>
              <div>
                <label>Match Size:</label>
                <select value={matchSize} onChange={(e) => setMatchSize(Number(e.target.value))}>
                  <option value={3}>3 Games</option>
                  <option value={5}>5 Games</option>
                </select>
              </div>
              <div className="players">
                <h3>Players:</h3>
                {players.map((p, idx) => (
                  <div key={idx}>{p}</div>
                ))}
              </div>
            </div>
          );
        }

        function ScoreBoard() {
            const { players, scores, updateScore, currentGame, matchSize, resetGame } = useContext(BowlingContext);
          
            const totalScores = (player) =>
              (scores[player] || []).reduce((sum, frame) => sum + (frame?.score || 0), 0);
          
            const handleChange = (player, frame, value) => {
              const num = parseInt(value) || 0;
              if (num <= 30) updateScore(player, frame, num);
            };
          
            const winner = () => {
              let best = null;
              let bestAvg = 0;
              players.forEach((p) => {
                const avg = totalScores(p) / currentGame;
                if (avg > bestAvg) {
                  best = p;
                  bestAvg = avg;
                }
              });
              return best;
            };