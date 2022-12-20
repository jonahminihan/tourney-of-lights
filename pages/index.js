import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Main from "../components/Main";
import Opening from "../components/opening/Opening";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Opening />;
}
