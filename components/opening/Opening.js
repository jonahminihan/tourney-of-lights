import styles from "./Opening.module.css";
import ReactSparkle from "react-sparkle";
import { useEffect, useState } from "react";
import { SERVERURL, SOCKETURL } from "../../constants/constants";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
let socket = null;

const Opening = ({ users, setUsers, onStartGame }) => {
  const [showStars, setShowStars] = useState(false);
  const [serverId, setServerId] = useState(null);
  // const [users, setUsers] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setShowStars(true);
    }, 6000);

    // fetch(`${SERVERURL}createLobby/${serverId}`);
  }, []);

  useEffect(() => {
    console.log("useEffect socket1", socket);
    if (socket) return;
    socket = io(SOCKETURL);
    const serverId = uuidv4().slice(0, 4);
    setServerId(serverId);
    socket.emit("createLobby", serverId);
    socket.on("userJoin", (arg) => {
      console.log("userJoin arg", arg);
      setUsers((prev) => [...prev, arg]);
    });
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className={`${styles.starsCont} opacity-0`}>
        <ReactSparkle
          count={30}
          flickerSpeed="slowest"
          fadeOutSpeed={1}
          flicker={false}
        />
      </div>
      <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0">
        <h1
          className={`${styles.text} ${styles.welcome} text-center opacity-0`}
        >
          Welcome
        </h1>
      </div>
      <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0">
        <h1 className={`${styles.text} ${styles.tothe} text-center opacity-0`}>
          To the
        </h1>
      </div>
      <div className="w-screen h-screen flex flex-col justify-center items-center absolute top-0 left-0">
        <h1
          className={`${styles.text} ${styles.tourney} text-center opacity-0`}
        >
          Tournament of Lights
        </h1>
        {users && users.length > 0 && (
          <h3 className="text-xl">Users Connected:</h3>
        )}
        {users.map((u) => (
          <span>{u.name}</span>
        ))}
      </div>

      {users.length > 0 && (
        <div className="w-screen h-12 absolute flex flex-col items-center justify-center bottom-12 overflow-hidden">
          <button className="bg-accent p-2 rounded" onClick={onStartGame}>
            Begin Game!
          </button>
        </div>
      )}
      <div className="w-screen h-12 absolute flex flex-col items-center justify-center bottom-0 overflow-hidden">
        <p
          className={`${styles.gototext} ${styles.tourneyGotoText} text-center translate-y-10`}
          style={{}}
        >
          Go to http://192.168.0.3:3000/play and use code {serverId}
        </p>
      </div>
    </div>
  );
};

export default Opening;
