import { useEffect, useRef, useState } from "react";
import { SOCKETURL } from "../../constants/constants";
import { io } from "socket.io-client";
import ReactSparkle from "react-sparkle";
import { v4 as uuidv4 } from "uuid";

const Play = () => {
  const codeRef = useRef();
  const nameRef = useRef();
  const gameRef = useRef();
  const backupGameRef = useRef();
  const [signedIn, setSignedIn] = useState(false);
  const [fields, setFields] = useState();
  let socket = null;

  useEffect(() => {
    console.log("useEffect socket1", socket);
    if (socket) return;
    socket = io(SOCKETURL);
    socket.on("message", (arg) => {});
    socket.on("successLogin", (arg) => {
      console.log("successLogin");
      setSignedIn(true);
    });
    socket.on("failedLogin", (arg) => {
      console.log("failedLogin");
      alert("Sign in failed");
    });
    if (localStorage.user) {
      if (confirm("Would you like to reconnect?")) {
        const user = JSON.parse(localStorage.user);
        setFields(JSON.parse(localStorage.user));
        socket.emit("reconnectUser", user);
      } else {
        localStorage.user = null;
      }
    }
  }, []);

  const handleSubmit = () => {
    const code = codeRef.current.value;
    const name = nameRef.current.value;
    const game = gameRef.current.value;
    const backupGame = backupGameRef.current.value;
    if (!code || !name || !game || !backupGame) {
      alert("Fill in all fields before submitting");
      return;
    }
    const userId = uuidv4();
    const fields = { id: userId, code, name, game, backupGame };
    socket.emit("login", fields);
    localStorage.user = JSON.stringify(fields);
    setFields(fields);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-5">Tournament of Lights</h1>
      {!signedIn && (
        <>
          <label>Code</label>
          <input className="mb-2 bg-slate-400 text-black" ref={codeRef}></input>
          <label>Name</label>
          <input className="mb-2 bg-slate-400 text-black" ref={nameRef}></input>
          <label>Game of Choice</label>
          <input className="mb-2 bg-slate-400 text-black" ref={gameRef}></input>
          <label>Backup Choice</label>
          <input
            className="mb-2 bg-slate-400 text-black"
            ref={backupGameRef}
          ></input>
          <button
            className="mb-2 bg-accent p-2 rounded absolute bottom-10"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </>
      )}
      {signedIn && (
        <>
          <h3 className="mt-24 text-xl">Waiting for Host</h3>
        </>
      )}
      <ReactSparkle
        count={30}
        flickerSpeed="slowest"
        fadeOutSpeed={1}
        flicker={false}
      />
    </div>
  );
};

export default Play;
