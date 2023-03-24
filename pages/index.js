import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Main from "../components/Main";
import Opening from "../components/opening/Opening";
import { useState } from "react";
import Bracket from "../components/bracket/Bracket";

const inter = Inter({ subsets: ["latin"] });

const states = {
  signin: "signing",
  bracket: "bracket",
};

export default function Home() {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(states.signin);

  const handleStartGame = () => {
    setState(states.bracket);
  };

  if (state === states.signin)
    return (
      <Opening
        users={users}
        setUsers={setUsers}
        onStartGame={handleStartGame}
      />
    );
  else return <Bracket users={users} setUsers={setUsers} />;
}
