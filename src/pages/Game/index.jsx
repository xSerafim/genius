import React, { useContext, useEffect, useState } from 'react';
import FruitsButtons from '../../components/FruitsButtons';
import GeniusContext from '../../context/GeniusContext';
import './style.css';

function Game() {
  const { fruits } = useContext(GeniusContext);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonFruitsDisabled, setButtonFruitsDisabled] = useState(true);
  const [resetedState, setResetedState] = useState(false);
  const [error, setError] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [playerAnswer, setPlayerAnswer] = useState([]);
  const [fruitSelected, setFruitSelected] = useState('');
  const [clicks, setClicks] = useState(-1);
  
  function handleGameLogic() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomFruit = fruits[randomNumber];

    if (!resetedState) {
      setCorrectAnswer(((prevState) => [...prevState, randomFruit]));
    } else {
      setCorrectAnswer([randomFruit]);
      setResetedState(false);
    };
  }

  function disableStartButton() {
    setClicks(-1);
    setButtonDisabled(true);
    handleGameLogic();
  }
  
  function handleUserInput(fruit) {
    setClicks((prevState) => prevState + 1);
    setPlayerAnswer((prevState) => [...prevState, fruit]);
  }

  function teste() {
    setButtonFruitsDisabled(true);
    const count = correctAnswer.length;
    let index = 0;
    const repeat = setInterval(() => {
      if (index === count) {
        setFruitSelected('');
        setButtonFruitsDisabled(false);
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
    setClicks(-1);
  }

  function resetState() {
    setButtonFruitsDisabled(true);
    setButtonDisabled(false);
    setPlayerAnswer([]);
    setCorrectAnswer([]);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 1000)
  }

  useEffect(() => {
    if (clicks !== -1 && correctAnswer[clicks] !==  playerAnswer[clicks]) {
      resetState();
      setResetedState(true);
    }
  }, [clicks])

  useEffect(() => {
    if (playerAnswer.length > 0 && playerAnswer.length === correctAnswer.length) {
      console.log('resposta alterada');
      handleGameLogic();
    }
  }, [playerAnswer])

  useEffect(() => {
    if (correctAnswer.length > 1) {
      console.log(correctAnswer.length);
      teste();
    } else if (correctAnswer.length === 1 && buttonDisabled) {
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
      {error && <h1>Você Errou!</h1>}
      <FruitsButtons
          fruitSelected={ fruitSelected }
          buttonFruitsDisabled={ buttonFruitsDisabled }
          handleUserInput={ handleUserInput }
      />
      <div className="cardContainer">
        <button
          disabled={ buttonDisabled }
          className="game-start"
          onClick={ disableStartButton }>
          Start Game
        </button>
      </div>
    </div>
  );
}

export default Game;
