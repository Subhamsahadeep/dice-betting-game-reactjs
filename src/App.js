import AllDices from "./AllDices";
import RandomDiceDenerator from "./RandomDiceDenerator";
import Balance from "./Balance";
import { useEffect, useState } from "react";
import { globalContext } from "./globalContext";
import diceprice from "./diceprice.json";

export default function App() {
  const [timer, setTimer] = useState(true);
  const [random, setRandom] = useState(0);
  const [prices, setPrices] = useState(diceprice);
  const [start, setStart] = useState(false);
  const [rules, setRules] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setRules([
      "You will be having $100 Balance",
      "You have $1 chips to play with",
      "You can bet on one or many of the 6 dice positions namely : 1,2,3,4,5,6",
      "You can bet mutliple bets on a any dice",
      "you will having a time-limit of 10 seconds to place a bet",
      "After that we will declare the winner along with your balance.",
      "You can continue the game by clicking on the continue button with previous balance",
      "You can reset the game by clicking on the reset button and your balance will reset to $100"
    ]);
  }, []);

  return (
    <div className="App">
      <h1>DICE BETTING GAME</h1>
      {!start && (
        <div className="start-game">
          <button onClick={() => setStart(true)}>START THE GAME</button>
        </div>
      )}

      <globalContext.Provider
        value={{
          prices,
          setPrices,
          random,
          setRandom,
          timer,
          setTimer,
          start,
          setStart,
          error,
          setError
        }}
      >
        <AllDices />
        <RandomDiceDenerator />
        <Balance />
      </globalContext.Provider>
      <>
        {error && error.length > 0 && (
          <div className="error center-elements"> {error} </div>
        )}
      </>
      <div className="rules">
        <div>
          <h3>Let's understand the rules of the game</h3>
        </div>
        {rules.map((el, index) => (
          <div className="item" key={index}>
            {" "}
            {el}{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
