import { useContext, useEffect, useState, useCallback } from "react";
import { globalContext } from "./globalContext";
import { diceJson } from "./AllDices";

export default function RandomDiceDenerator() {
  const { start, random, setRandom, timer } = useContext(globalContext);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    showWinner(random);
  }, [random]);

  const CallRandomMethod = useCallback(() => {
    if (start === true && timer === false) {
      setSeconds(2);
      setTimeout(() => {
        const randomNo = Math.ceil(Math.random() * 6);
        setRandom(randomNo);
      }, 2000);
    }
  }, [start, timer]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    CallRandomMethod();
  }, [CallRandomMethod]);

  const showWinner = (random) => {
    let imageJson = diceJson.filter((el) => el.no === random);
    return (
      <>
        {imageJson && imageJson[0] && imageJson[0].image && (
          <div className="winner">
            <img src={imageJson[0].image} alt="winner" />
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    //Implementing the setInterval method
    let interval;
    if (start === true && seconds < 3 && seconds >= 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
    //Clearing the interval
    return () => clearInterval(interval);
  }, [seconds, start]);

  return (
    <div className="pad-5">
      {random > 0 ? (
        <div className="pad-5">
          THE WINNER IS
          <div>{showWinner(random)}</div>
        </div>
      ) : (
        seconds > 0 &&
        seconds <= 2 && <h1> Declaring the winner in .... {seconds} </h1>
      )}
    </div>
  );
}
