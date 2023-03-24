import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import ReactSparkle from "react-sparkle";
import styles from "./Bracket.module.css";
import Matchup from "./matchup/Matchup";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const Bracket = ({ users }) => {
  // const users = [
  //   {
  //     id: "asdf",
  //     name: "Jonah",
  //     code: "asdf",
  //     game: "mario kart",
  //     backupGame: "rock paper sissors",
  //   },
  //   {
  //     id: "asdf2",
  //     name: "Bridget",
  //     code: "asdf",
  //     game: "mario paper",
  //     backupGame: "paper smashers",
  //   },
  //   {
  //     id: "asdf3",
  //     name: "Will",
  //     code: "asdf",
  //     game: "smash bros",
  //     backupGame: "big sissors bros",
  //   },
  //   {
  //     id: "asdf4",
  //     name: "Edwin",
  //     code: "asdf",
  //     game: "water cup game",
  //     backupGame: "woa luigi",
  //   },
  //   {
  //     id: "asdf5",
  //     name: "Rodney",
  //     code: "asdf",
  //     game: "mario kart",
  //     backupGame: "rock paper sissors",
  //   },
  //   {
  //     id: "asdf6",
  //     name: "Liminey",
  //     code: "asdf",
  //     game: "mario paper",
  //     backupGame: "paper smashers",
  //   },
  //   {
  //     id: "asdf7",
  //     name: "The Grinch",
  //     code: "asdf",
  //     game: "smash bros",
  //     backupGame: "big sissors bros",
  //   },
  //   {
  //     id: "asdf8",
  //     name: "Santa",
  //     code: "asdf",
  //     game: "water cup game",
  //     backupGame: "woa luigi",
  //   },
  // ];

  const [bracket, setBracket] = useState(null);
  const [backupGames, setBackupGames] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const newBackupGames = users.map((u) => u.backupGame);
    setBackupGames(newBackupGames);
    let isMultipleOf2 = Number.isInteger(Math.log2(users.length));
    let tempUsers = [...users];
    tempUsers = shuffle(tempUsers);
    while (!isMultipleOf2) {
      tempUsers.push({
        id: "bye",
        name: "bye week",
        code: "asdf",
        game: "bye game",
        backupGame: "bye game",
      });
      isMultipleOf2 = Number.isInteger(Math.log2(tempUsers.length));
    }

    const matchups = [];
    for (let i = 0; i < tempUsers.length; i = i + 2) {
      matchups.push({
        playerOne: tempUsers[i],
        playerTwo: tempUsers[i + 1],
        layer: 0,
      });
    }
    const layers = [];
    let layerCount = Math.log2(matchups.length) + 1; // how many actually have matchups in them
    layerCount = 2 + (layerCount - 2) * 2; // add empty layers
    layers.push(matchups);
    let matchupCount = matchups.length / 2;
    for (let i = 1; i < layerCount; i++) {
      if (i % 2 === 1) {
        const nextMatchups = [];
        for (let j = matchupCount; j > 0; j--) {
          nextMatchups.push({ status: "pending" });
        }
        if (nextMatchups.length > 0) layers.push(nextMatchups);
        console.log("i", i);
        matchupCount = Math.floor(matchupCount / 2);
      } else {
        layers.push([]);
      }
    }
    const winnerBracket = { layers: layers };
    let loserMatchupsCount = matchups.length / 2;
    let loserLayers = [];
    for (let i = 0; i < layerCount; i++) {
      if (i % 2 === 0 && i !== 0) {
        loserMatchupsCount = Math.floor(loserMatchupsCount / 2);
      }
      const nextMatchups = [];
      for (let j = loserMatchupsCount; j > 0; j--) {
        nextMatchups.push({ status: "pending" });
      }
      loserLayers.push(nextMatchups);
    }
    const loserBracket = { layers: loserLayers };
    setBracket({
      winners: winnerBracket,
      losers: loserBracket,
      finals: {
        playerOne: null,
        playerTwo: null,
        status: "pending",
      },
    });

    console.log("bracket", { winners: winnerBracket, losers: loserBracket });
  }, []);

  const handleWinnerWin = (
    matchup,
    winner,
    loser,
    layerIndex,
    matchupIndex
  ) => {
    const newWinners = { ...bracket.winners };
    newWinners.layers[layerIndex][matchupIndex].winner = winner;
    newWinners.layers[layerIndex][matchupIndex].loser = loser;
    if (newWinners.layers.length > layerIndex + 1) {
      let nextLayerIndex = layerIndex + 1;
      if (nextLayerIndex % 2 === 0) nextLayerIndex = nextLayerIndex + 1;
      if (matchupIndex % 2 === 0) {
        newWinners.layers[nextLayerIndex][matchupIndex / 2].playerOne = winner;
      } else {
        newWinners.layers[nextLayerIndex][
          Math.floor(matchupIndex / 2)
        ].playerTwo = winner;
      }
      const nextMatch =
        newWinners.layers[nextLayerIndex][Math.floor(matchupIndex / 2)];
      if (nextMatch.playerOne && nextMatch.playerTwo) {
        newWinners.layers[nextLayerIndex][Math.floor(matchupIndex / 2)].status =
          "play";
      }
    }
    const newLosers = { ...bracket.losers };
    let nextLoserMatch =
      newLosers.layers[layerIndex][Math.floor(matchupIndex / 2)];
    if (layerIndex === 0) {
      if (matchupIndex % 2 === 0) {
        newLosers.layers[layerIndex][Math.floor(matchupIndex / 2)].playerOne =
          loser;
      } else {
        newLosers.layers[layerIndex][Math.floor(matchupIndex / 2)].playerTwo =
          loser;
      }
    } else {
      newLosers.layers[layerIndex][Math.floor(matchupIndex)].playerTwo = loser;
      nextLoserMatch = newLosers.layers[layerIndex][Math.floor(matchupIndex)];
      console.log("nextLoserMatch", nextLoserMatch);
      console.log("matchupIndex", matchupIndex);
    }
    if (nextLoserMatch.playerOne && nextLoserMatch.playerTwo) {
      if (layerIndex === 0) {
        newLosers.layers[layerIndex][Math.floor(matchupIndex / 2)].status =
          "play";
      } else {
        newLosers.layers[layerIndex][Math.floor(matchupIndex)].status = "play";
      }
    }
    let winnerBracketWinner = null;
    let newFinals = { ...bracket.finals };
    if (newWinners.layers.length === layerIndex + 1) {
      winnerBracketWinner = winner;
      newFinals.playerOne = winner;
      if (newFinals.playerTwo) {
        newFinals.status = "play";
      }
    }

    const newBracket = {
      ...bracket,
      winners: newWinners,
      losers: newLosers,
      winnerBracketWinner,
      finals: newFinals,
    };
    setBracket(newBracket);
  };

  const handleLoserWin = (matchup, winner, loser, layerIndex, matchupIndex) => {
    const newLosers = { ...bracket.losers };
    newLosers.layers[layerIndex][matchupIndex].winner = winner;
    let loserBracketWinner = null;
    let newFinals = { ...bracket.finals };
    if (newLosers.layers.length > layerIndex + 1) {
      let nextMatch = null;
      if (
        newLosers.layers[layerIndex + 1].length <
        newLosers.layers[layerIndex].length
      ) {
        if (matchupIndex % 2 === 0)
          newLosers.layers[layerIndex + 1][
            Math.floor(matchupIndex / 2)
          ].playerOne = winner;
        else
          newLosers.layers[layerIndex + 1][
            Math.floor(matchupIndex / 2)
          ].playerTwo = winner;
        nextMatch =
          newLosers.layers[layerIndex + 1][Math.floor(matchupIndex / 2)];
        if (nextMatch.playerOne && nextMatch.playerTwo) {
          newLosers.layers[layerIndex + 1][
            Math.floor(matchupIndex / 2)
          ].status = "play";
        }
      } else {
        newLosers.layers[layerIndex + 1][matchupIndex].playerOne = winner;
        nextMatch = newLosers.layers[layerIndex + 1][matchupIndex];
        if (nextMatch.playerOne && nextMatch.playerTwo) {
          newLosers.layers[layerIndex + 1][matchupIndex].status = "play";
        }
      }
    } else {
      loserBracketWinner = winner;
      newFinals.playerTwo = winner;
      if (newFinals.playerOne) {
        newFinals.status = "play";
      }
    }
    const newBracket = {
      ...bracket,
      losers: newLosers,
      loserBracketWinner,
      finals: newFinals,
    };
    console.log("newBracket", newBracket);
    setBracket(newBracket);
  };

  return (
    <div className="w-screen h-screen">
      <div className={`${styles.starsCont} absolute top-0 left-0 -z-10`}>
        <ReactSparkle
          count={30}
          flickerSpeed="slowest"
          fadeOutSpeed={1}
          flicker={false}
        />
      </div>
      {winner && (
        <div className={`${styles.starsCont} absolute top-0 left-0`}>
          <ReactConfetti />
          <div className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center">
            <div className="w-96 h-96 bg-slate-600 rounded flex justify-center items-center">
              <h1 className="text-4xl text-center p-10">
                Congrats you assholes, you let {winner.name} win!!
              </h1>
            </div>
          </div>
        </div>
      )}
      <h1 className={`${styles.text} text-4xl text-center pt-5`}>
        Tournament of Lights
      </h1>
      <div className="flex justify-between">
        <div>
          <div className="flex">
            {bracket &&
              bracket.winners.layers.map((layer, layerIndex) => {
                return (
                  <div
                    className="w-44 flex justify-center items-center flex-col ml-2"
                    style={{ height: `${bracket.winners.layers[0] * 11}rem` }}
                  >
                    {layer.map((match, matchupIndex) => {
                      return (
                        <Matchup
                          layerIndex={layerIndex}
                          matchup={match}
                          backupGames={backupGames}
                          onWinner={(winner, loser) =>
                            handleWinnerWin(
                              match,
                              winner,
                              loser,
                              layerIndex,
                              matchupIndex,
                              false
                            )
                          }
                        />
                      );
                    })}
                  </div>
                );
              })}
          </div>
          <div className="flex">
            {bracket &&
              bracket.losers.layers.map((layer, layerIndex) => {
                return (
                  <div
                    className="w-44 flex justify-center items-center flex-col ml-2"
                    style={{ height: `${bracket.losers.layers[0] * 11}rem` }}
                  >
                    {layer.map((match, matchupIndex) => {
                      return (
                        <Matchup
                          layerIndex={layerIndex}
                          matchup={match}
                          backupGames={backupGames}
                          onWinner={(winner, loser) =>
                            handleLoserWin(
                              match,
                              winner,
                              loser,
                              layerIndex,
                              matchupIndex,
                              false
                            )
                          }
                        />
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>

        {bracket && (
          <div
            className="w-44 flex justify-center items-center flex-col mr-10"
            style={{ height: `${bracket.winners.layers[0] * 11}rem` }}
          >
            <Matchup
              matchup={bracket.finals}
              onWinner={(winner, loser) => {
                setWinner(winner);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bracket;
