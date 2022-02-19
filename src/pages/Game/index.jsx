import React, { useContext, useState } from 'react';
import { GiShinyApple, GiKiwiFruit, GiBananaBunch, GiPeach } from "react-icons/gi";
import GeniusContext from '../../context/GeniusContext';
import './style.css';

function Game() {

  const {
    fruits,
    setFruits,
    playerAnswer,
    setPlayerAnswer,
  } = useContext(GeniusContext);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [fruitSelected, setFruitSelected] = useState('');

  function handleUserInput(fruit) {
    console.log(fruit);
  }

  function handleGameLogic() {
  // const { gameArray, answerArray } = this.state;
  // const randomNumber = Math.floor(Math.random() * 4);

  // const randomFruit = gameArray[randomNumber];
  }

  // 1 - Click start button
  // 2 - One fruit is selected
  // 3 - User click
  // 4 - User continue/fail
  // 5 - Continue ? Two fruit selected : Game Over

  return (
    <div>
      <div className="cardContainer">
        <button
          className={ fruitSelected === "apple" ? "card-selected card-selected-apple" : "card" }
          onClick={() => handleUserInput("apple")}
        >
          <GiShinyApple className="icons" />
        </button>

        <button
          className={ fruitSelected === "kiwi" ? "card-selected card-selected-kiwi" : "card" }
          onClick={() => handleUserInput("kiwi")}
        >
          <GiKiwiFruit className="icons" />
        </button>
      </div>

      <div className="cardContainer">
        <button
          className={ fruitSelected === "banana" ? "card-selected card-selected-banana" : "card" }
          onClick={() => handleUserInput("banana")}
        >
          <GiBananaBunch className="icons" />
        </button>
        <button
          className={ fruitSelected === "peach" ? "card-selected card-selected-peach" : "card" }
          onClick={() => handleUserInput("peach")}
        > 
          <GiPeach className="icons" />
        </button>
      </div>

      <div className="cardContainer">
        <button disabled={buttonDisabled} className="card game-start" onClick={() => handleGameLogic()}> 
          Start Game
        </button>
      </div>
    </div>
  );
}
 
export default Game;
