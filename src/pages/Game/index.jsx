import React, { useContext, useEffect, useState } from 'react';
import { GiShinyApple, GiKiwiFruit, GiBananaBunch, GiPeach } from "react-icons/gi";
import GeniusContext from '../../context/GeniusContext';
import './style.css';

function Game() {

  const {
    fruits,
  } = useContext(GeniusContext);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [fruitSelected, setFruitSelected] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [playerAnswer, setPlayerAnswer] = useState([]);
  
  function handleGameLogic() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomFruit = fruits[randomNumber];

    setButtonDisabled(true);
    setCorrectAnswer(((prevState) => [...prevState, randomFruit]));
  }
  
  function handleUserInput(fruit) {
    setPlayerAnswer((prevState) => [...prevState, fruit]);
  }

  function teste() {
    const count = correctAnswer.length;
    let index = 0;
    const repeat = setInterval(() => {
      if (index === count) {
        setFruitSelected('');
        clearInterval(repeat);
      } else {
        setFruitSelected(correctAnswer[index]);
        index += 1;
        setTimeout(() => {
          setFruitSelected('');
        }, 500)
      }
    }, 1000);
    setPlayerAnswer([]);
  }

  useEffect(() => {
    if (playerAnswer.length > 0 && playerAnswer.length === correctAnswer.length) {
      handleGameLogic();
    }
  }, [playerAnswer])

  useEffect(() => {
    if (correctAnswer.length > 1) {
      teste();
    } else {
      setFruitSelected(correctAnswer[0]);
      setTimeout(() => {
        setFruitSelected('');
      }, 1000)
    }
  }, [correctAnswer])

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
        <button
          disabled={ buttonDisabled }
          className="card game-start"
          onClick={ handleGameLogic }>
          Start Game
        </button>
      </div>
    </div>
  );
}

export default Game;
