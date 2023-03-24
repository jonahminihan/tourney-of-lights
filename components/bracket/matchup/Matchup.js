import { useEffect, useState } from "react";
import styles from "./Matchup.module.css";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Matchup = ({ matchup, onWinner, layerIndex, backupGames }) => {
  //   console.log("matchup", matchup);
  const [winningGame, setWinningGame] = useState(null);
  useEffect(() => {
    if (!matchup.playerOne || !matchup.playerTwo) return;
    const gameWinner = randomIntFromInterval(0, 1);
    if (gameWinner === 0) setWinningGame(matchup.playerOne.game);
    if (gameWinner === 1) setWinningGame(matchup.playerTwo.game);
  }, [matchup]);

  if (matchup.status === "pending") {
    return (
      <div className="mt-10 w-44 ml-6 h-44">
        <h1 className="text-xl">
          {matchup.playerOne ? matchup.playerOne.name : "TBA"}
        </h1>
        <div className={`${styles.rightSideBorder} w-full h-px bg-white`}></div>
        <h3 className={`${styles.rightSideBorder} p-4 pr-2`}>TBA</h3>
        <h1 className={`${styles.rightSideBorder} text-xl`}>
          {matchup.playerTwo ? matchup.playerTwo.name : "TBA"}
        </h1>
        <div className={`${styles.rightSideBorder} w-full h-px bg-white`}></div>
      </div>
    );
  }

  if (
    !winningGame &&
    matchup &&
    matchup.playerOne &&
    matchup.playerTwo &&
    layerIndex > 0
  ) {
    const newWinningGame =
      backupGames[Math.floor(Math.random() * backupGames.length)];
    console.log("newWinningGame", newWinningGame);
    setWinningGame(newWinningGame);
  }

  return (
    <div className="mt-10 w-44 ml-6 h-44">
      <h1
        className="text-xl"
        onClick={() => onWinner(matchup.playerOne, matchup.playerTwo)}
      >
        {matchup.playerOne.name}
      </h1>
      <div className={`${styles.rightSideBorder} w-full h-px bg-white`}></div>
      <h3 className={`${styles.rightSideBorder} p-4 pr-2`}>
        Play: {winningGame}
      </h3>
      <h1
        className={`${styles.rightSideBorder} text-xl`}
        onClick={() => onWinner(matchup.playerTwo, matchup.playerOne)}
      >
        {matchup.playerTwo.name}
      </h1>
      <div className={`${styles.rightSideBorder} w-full h-px bg-white`}></div>
    </div>
  );
};

export default Matchup;
