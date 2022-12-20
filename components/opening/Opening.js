import styles from "./Opening.module.css";
import ReactSparkle from "react-sparkle";
import { useEffect, useState } from "react";

const Opening = () => {
  const [showStars, setShowStars] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowStars(true);
    }, 6000);
  }, []);
  return (
    <div className="w-screen h-screen">
      <div className="w-screen h-screen flex justify-center items-center absolute">
        <h1
          className={`${styles.text} ${styles.welcome} text-center opacity-0`}
        >
          Welcome
        </h1>
      </div>
      <div className="w-screen h-screen flex justify-center items-center absolute">
        <h1 className={`${styles.text} ${styles.tothe} text-center opacity-0`}>
          To the
        </h1>
      </div>
      <div className="w-screen h-screen flex justify-center items-center absolute">
        <h1
          className={`${styles.text} ${styles.tourney} text-center opacity-0`}
        >
          Tournament of Lights
        </h1>
      </div>

      <div className={`${styles.starsCont} opacity-0`}>
        <ReactSparkle
          count={30}
          flickerSpeed="slowest"
          fadeOutSpeed={1}
          flicker={false}
        />
      </div>
    </div>
  );
};

export default Opening;
