import React, { useContext } from 'react';
import { GiShinyApple, GiKiwiFruit, GiBananaBunch, GiPeach } from "react-icons/gi";
import GeniusContext from '../../context/GeniusContext';
import './index.css';

function FruitsButtons({
  fruitSelected,
  buttonFruitsDisabled,
  handleUserInput,
}) {
  const arrIcons = [GiShinyApple, GiKiwiFruit, GiBananaBunch, GiPeach];
  const { fruits } = useContext(GeniusContext);
  function fruitTag(icon) {
    const element =  React.createElement(icon, { class: 'icons' });
    return element;
  }
  return(
    <div className="cardContainer">
      {arrIcons.map((icon, index) => (
        <button
          key={ index }
          id={ icon['name'] }
          disabled={ buttonFruitsDisabled }
          className={ fruitSelected === fruits[index]
            ? `card-selected card-selected-${fruits[index]}`
            : "card" }
          onClick={() => handleUserInput(fruits[index])}
        >
          { fruitTag(icon) }
        </button>
      ))}
    </div>
  );
}

export default FruitsButtons;
