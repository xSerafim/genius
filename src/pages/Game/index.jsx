import { func } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { GiShinyApple, GiKiwiFruit, GiBananaBunch, GiPeach } from "react-icons/gi";
import GeniusContext from '../../context/GeniusContext';
import './style.css';

function Game() {

  const {
    fruits,
  } = useContext(GeniusContext);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonFruitsDisabled, setButtonFruitsDisabled] = useState(true);
  const [fruitSelected, setFruitSelected] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [playerAnswer, setPlayerAnswer] = useState([]);
  
  function handleGameLogic() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomFruit = fruits[randomNumber];

    setCorrectAnswer(((prevState) => [...prevState, randomFruit]));
  }

  function disableStartButton() {
    setButtonDisabled(true);
    handleGameLogic();
  }
  
  function handleUserInput(fruit) {
    setPlayerAnswer((prevState) => [...prevState, fruit]);
  }

  function teste() {
    setButtonFruitsDisabled(true);
    const count = correctAnswer.length;
    let index = 0;
    const repeat = setInterval(() => {
      if (index === count) {
        setFruitSelected('');
        clearInterval(repeat);
        setButtonFruitsDisabled(false);
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
    } else if (correctAnswer.length === 1) {
      setFruitSelected(correctAnswer[0]);
      setTimeout(() => {
        setFruitSelected('');
        setButtonFruitsDisabled(false);
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
          disabled={ buttonFruitsDisabled }
          className={ fruitSelected === "apple" ? "card-selected card-selected-apple" : "card" }
          onClick={() => handleUserInput("apple")}
        >
          <GiShinyApple className="icons" />
        </button>

        <button
          disabled={ buttonFruitsDisabled }
          className={ fruitSelected === "kiwi" ? "card-selected card-selected-kiwi" : "card" }
          onClick={() => handleUserInput("kiwi")}
        >
          <GiKiwiFruit className="icons" />
        </button>
      </div>

      <div className="cardContainer">
        <button
          disabled={ buttonFruitsDisabled }
          className={ fruitSelected === "banana" ? "card-selected card-selected-banana" : "card" }
          onClick={() => handleUserInput("banana")}
        >
          <GiBananaBunch className="icons" />
        </button>
        <button
          disabled={ buttonFruitsDisabled }
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
          onClick={ disableStartButton }>
          Start Game
        </button>
      </div>
    </div>
  );
}

export default Game;
