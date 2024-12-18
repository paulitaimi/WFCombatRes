import React, { useState } from 'react';
import './App.css';

function App() {
  const initialState = {
    kills: 0,
    overkill: 0,
    rankBonus: 0,
    flank: false,
    rear: false,
    higherground: false,
    standard: false,
    battlestandard: false,
    other: 0,
  };

  const [player1, setPlayer1] = useState(initialState);
  const [player2, setPlayer2] = useState(initialState);
  const [edition, setEdition] = useState("6th Edition");

  const maxRankBonus = edition === "Old World" ? 2 : 3;

  const handleInputChange = (player, setPlayer, field, value) => {
    setPlayer({
      ...player,
      [field]: value,
    });
  };

  const calculateScore = (player) => {
    const { kills, overkill, rankBonus, flank, rear, higherground, standard, battlestandard, other } = player;
    const maxOverkill = edition === "Old World" ? 5 : 5; // Adjust this later if editions differ
    return (
      kills +
      Math.min(overkill, maxOverkill) +
      rankBonus +
      (flank ? 1 : 0) +
      (rear ? 1 : 0) +
      (higherground ? 1 : 0) +
      (standard ? 1 : 0) +
      (battlestandard ? 1 : 0) +
      other
    );
  };

  const resetForm = () => {
    setPlayer1(initialState);
    setPlayer2(initialState);
  };

  const renderForm = (player, setPlayer, label) => (
    <div className="player-section">
      <h2>{label}</h2>
      <label>
        Kills:
        <input
          type="number"
          min="0"
          value={player.kills}
          onChange={(e) => handleInputChange(player, setPlayer, "kills", +e.target.value)}
        />
      </label>

      <label>
        Overkill (max 5):
        <input
          type="number"
          min="0"
          max="5"
          value={player.overkill}
          onChange={(e) => handleInputChange(player, setPlayer, "overkill", +e.target.value)}
        />
      </label>

      <label>
        Rank Bonus:
        <input
          type="number"
          min="0"
          max={maxRankBonus}
          value={player.rankBonus}
          onChange={(e) =>
            handleInputChange(player, setPlayer, "rankBonus", Math.min(+e.target.value, maxRankBonus))
          }
        />
        <span> (max {maxRankBonus})</span>
      </label>

      {[ "Flank", "Rear", "Higher Ground", "Standard", "Battle Standard"].map((item, idx) => (
        <label key={idx}>
          <input
            type="checkbox"
            checked={player[item.toLowerCase().replace(" ", "")]}
            onChange={(e) =>
              handleInputChange(player, setPlayer, item.toLowerCase().replace(" ", ""), e.target.checked)
            }
          />
          {item}
        </label>
      ))}

      <label>
        Other:
        <input
          type="number"
          min="0"
          value={player.other}
          onChange={(e) => handleInputChange(player, setPlayer, "other", +e.target.value)}
        />
      </label>
    </div>
  );

  return (
    <div className="App">
      <h1>Warhammer Fantasy Combat Resolution</h1>

      <label>
        Edition:
        <select value={edition} onChange={(e) => setEdition(e.target.value)}>
          <option>6th Edition</option>
          <option>Old World</option>
        </select>
      </label>

      <div className="form-container">
        {renderForm(player1, setPlayer1, "Player 1")}
        {renderForm(player2, setPlayer2, "Player 2")}
      </div>

      <h2>
        Player 1 Score: {calculateScore(player1)} | Player 2 Score: {calculateScore(player2)}
      </h2>

      <button onClick={resetForm}>Reset</button>
    </div>
  );
}

export default App;
