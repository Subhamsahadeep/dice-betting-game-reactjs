import { useContext, useEffect, useState } from "react";
import Dice from "./Dice";
import { globalContext } from "./globalContext";
import Dice1 from "./assets/one.png";
import Dice2 from "./assets/two.png";
import Dice3 from "./assets/three.png";
import Dice4 from "./assets/four.png";
import Dice5 from "./assets/five.png";
import Dice6 from "./assets/six.png";

export const diceJson = [
  {
    no: 1,
    image: Dice1
  },
  {
    no: 2,
    image: Dice2
  },
  {
    no: 3,
    image: Dice3
  },
  {
    no: 4,
    image: Dice4
  },
  {
    no: 5,
    image: Dice5
  },
  {
    no: 6,
    image: Dice6
  }
];

export default function AllDices() {
  const [countDices, setCountDices] = useState([]);
  const { start, timer, setTimer } = useContext(globalContext);
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (start === true && timer !== false) {
      setTimer(true);
      setSeconds(10);
      setTimeout(() => {
        setTimer(false);
      }, 10000);
    }
  }, [start, timer, setTimer]);

  useEffect(() => {
    setCountDices(diceJson);
  }, []);

  useEffect(() => {
    //Implementing the setInterval method
    let interval;
    if (start === true && seconds !== 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
    //Clearing the interval
    return () => clearInterval(interval);
  }, [seconds, start]);

  return (
    <div>
      <div className="center-elements">
        <div className="time-limit">
          {" "}
          00 : 00 :{" "}
          {seconds > 9 ? <span>{seconds}</span> : <span>0{seconds}</span>}
        </div>
      </div>

      <div className="flex flex-wrap justify-content-center">
        {countDices.map((el, index) => (
          <Dice
            key={index}
            diceNumberProp={el.no}
            diceImageProp={el.image}
            timer={timer}
          ></Dice>
        ))}
      </div>
    </div>
  );
}
