import React, { useState } from 'react';

function CombatResolution() {
  const initialState = {
    kills: 0,
    overkill: 0,
    rankBonus: false,
    flank: false,
    rear: false,
    higherGround: false,
    other: 0,
  };

  const [player1, setPlayer1] = useState(initialState);
  const [player2, setPlayer2] = useState(initialState);
  const [edition, setEdition] = useState("6th Edition");

  const calculateScore = (player) => {
    const { kills, overkill, rankBonus, flank, rear, higherGround, other } = player;
    const overkillMax = edition === "Old World" ? 5 : 5; // Example difference point
    return (
      kills +
      Math.min(overkill, overkillMax) +
      (rankBonus ? 1 : 0) +
      (flank ? 1 : 0) +
      (rear ? 1 : 0) +
      (higherGround ? 1 : 0) +
      other
    );
  };

  const resetScores = () => {
    setPlayer1(initialState);
    setPlayer2(initialState);
  };

  const renderPlayerInputs = (player, setPlayer, idx) => (
    <div key={idx}>
      <h3>Player {idx + 1}</h3>
      <label>
        Kills:
        <input
          type="number"
          value={player.kills}
          onChange={(e) => setPlayer({ ...player, kills: +e.target.value })}
        />
      </label>
      <label>
        Overkill (max 5):
        <input
          type="number"
          value={player.overkill}
          onChange={(e) => setPlayer({ ...player, overkill: +e.target.value })}
        />
      </label>
      {["Rank Bonus", "Flank", "Rear", "Higher Ground"].map((bonus, i) => (
        <label key={i}>
          <input
            type="checkbox"
            checked={player[bonus.toLowerCase().replace(" ", "")]}
            onChange={(e) =>
              setPlayer({
                ...player,
                [bonus.toLowerCase().replace(" ", "")]: e.target.checked,
              })
            }
          />
          {bonus}
        </label>
      ))}
      <label>
        Other Modifiers:
        <input
          type="number"
          value={player.other}
          onChange={(e) => setPlayer({ ...player, other: +e.target.value })}
        />
      </label>
    </div>
  );

  return (
    <div>
      <h2>Warhammer Fantasy Combat Resolution</h2>
      <label>
        Edition:
        <select value={edition} onChange={(e) => setEdition(e.target.value)}>
          <option>6th Edition</option>
          <option>Old World</option>
        </select>
      </label>

      {renderPlayerInputs(player1, setPlayer1, 0)}
      {renderPlayerInputs(player2, setPlayer2, 1)}

      <h2>
        Result: Player 1 Score: {calculateScore(player1)} | Player 2 Score:{" "}
        {calculateScore(player2)}
      </h2>
      <button onClick={resetScores}>Reset</button>
    </div>
  );
}

export default CombatResolution;
