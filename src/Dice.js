import React, { useEffect, useContext, useState } from "react";
import { globalContext } from "./globalContext";

function Dice({ diceNumberProp, diceImageProp }) {
  const [diceNumber, setDiceNumber] = useState();
  const [image, setImage] = useState();
  const [betprice, setBetprice] = useState();
  const { start, prices, setPrices, timer, setTimer } = useContext(
    globalContext
  );

  const handlePrice = (type) => {
    switch (type) {
      case "minus":
        if (betprice > 0) {
          setBetprice(betprice - 1);
        }
        break;
      case "plus":
        if (betprice >= 0) {
          setBetprice(betprice + 1);
        }
        break;
      default:
        setBetprice(0);
        break;
    }
  };

  useEffect(() => {
    setDiceNumber(diceNumberProp);
  }, [diceNumberProp]);

  useEffect(() => {
    setImage(diceImageProp);
  }, [diceImageProp]);
  useEffect(() => {
    setBetprice(0);
  }, []);

  useEffect(() => {
    setTimer(timer);
    if (timer === true) {
      setBetprice(0);
    }
    if (timer === false) {
      let arr = [...prices];
      arr.map((el) => (el.no === diceNumber ? (el.price = betprice) : el));
      setPrices(arr);
    }
  }, [timer]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="card-dice">
      <img src={image} alt={"dice-image-" + diceNumber} />
      <div className="price pad-5">${betprice}</div>
      {start && timer && (
        <div>
          <button onClick={() => handlePrice("minus")}> - </button>
          <button onClick={() => handlePrice("plus")}> + </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(Dice);
