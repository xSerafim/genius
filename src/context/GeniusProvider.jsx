import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import GeniusContext from './GeniusContext';

function GeniusProvider({ children }) {
  const [fruits, setFruits] = useState(['apple', 'kiwi', 'banana', 'peach']);
  // const [playerAnswer, setPlayerAnswer] = useState([]);
  // const [correctAnswer, setCorrectAnswer] = useState([]);

  const value = useMemo(() => ({
    fruits,
    setFruits,
    // playerAnswer,
    // setPlayerAnswer,
    // correctAnswer,
    // setCorrectAnswer
  }), [
    fruits, setFruits
  ]);

  return (
    <GeniusContext.Provider value={ value }>
      { children }
    </GeniusContext.Provider>
  );
}

GeniusProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GeniusProvider;
