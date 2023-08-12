import { useContext, useEffect, useState, useCallback } from "react";
import { globalContext } from "./globalContext";
import diceprice from "./diceprice.json";
export default function Balance({ randomNo }) {
  const [balance, setBalance] = useState(10);
  const [winner, setWinner] = useState(0);
  const [loss, setLoss] = useState(0);
  const {
    start,
    prices,
    setPrices,
    random,
    setRandom,
    timer,
    setTimer,
    setStart,
    setError
  } = useContext(globalContext);

  useEffect(() => {
    setBalance(10);
  }, []);

  const calculateWinner = useCallback(() => {
    if (start === true && timer === false && random !== 0) {
      let pricesArray = [...prices];
      let allbets = pricesArray.reduce((acc, el) => (acc = acc + el.price), 0);
      if (allbets > balance) {
        setError(
          "Your bets are Invalid. You can only use your left over balance for betting. Click Continue to try again.. "
        );
      } else {
        let winner = pricesArray.filter((el) => el.no === random);
        pricesArray = pricesArray.filter((element) => element.no !== random);
        let sumOfLosses = pricesArray.reduce(
          (acc, el) => (acc = acc + el.price),
          0
        );
        let balancetemp = balance + winner[0].price * 2 - sumOfLosses;
        setBalance(balancetemp);
        setWinner(winner[0].price * 2);
        setLoss(sumOfLosses);
      }
    }
  }, [start, timer, random]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    calculateWinner();
  }, [calculateWinner]);

  // useEffect(() => {
  //   const fetchBusinesses = () => {
  //     if (start === true && timer === false && random !== 0) {
  //       let pricesArray = [...prices];
  //       let winner = pricesArray.filter((el) => el.no === random);
  //       setWinner(winner[0].price * 2);
  //       pricesArray = pricesArray.filter((element) => element.no !== random);
  //       let sumOfLosses = pricesArray.reduce(
  //         (acc, el) => (acc = acc + el.price),
  //         0
  //       );
  //       setLoss(sumOfLosses);
  //       let balancetemp = balance + winner[0].price * 2 - sumOfLosses;
  //       setBalance(balancetemp);
  //     }
  //   };
  //   fetchBusinesses();
  // }, [random, timer, start]);

  const Continue = () => {
    setBalance(balance);
    setPrices(diceprice);
    setRandom(0);
    setTimer(true);
    setStart(true);
    setWinner(0);
    setLoss(0);
    setError("");
  };

  const reset = () => {
    setBalance(10);
    setPrices(diceprice);
    setRandom(0);
    setTimer(true);
    setStart(true);
    setWinner(0);
    setLoss(0);
    setError("");
  };

  return (
    <div>
      <h1>Balance : ${balance} </h1>
      <div>
        <div>Winnings : ${winner}</div>
        <div>Losses : ${loss}</div>
      </div>
      <div className="reset pad-5">
        <button onClick={() => reset()}> Reset </button>
        {balance !== 0 && (
          <button onClick={() => Continue()}> Continue </button>
        )}
      </div>
    </div>
  );
}
