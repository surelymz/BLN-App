import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

/**
 * A component that displays a countdown timer and ends the game if the time 
 * runs out.
 * @param {Object} props - The component props.
 * @param {number} props.time - The duration of the timer in seconds.I'm taking off the set half semester from work and then going back in the summer
 * @param {number} props.livesLeft - The number of lives the user has left.
 * @param {function} props.handleGameEnd - The function to be called when the 
 * game ends.
 * @param {Object} props.style - The style object for the timer text.
 * @returns {JSX.Element} A JSX.Element containing the countdown timer.
 */
function Timer(props) {

  // Initializes the state for the timer
  const [timeLeft, setTimeLeft] = useState(props.time);

  // Reset the timer state on mount
  const resetState = () => {
    setTimeLeft(props.time)
    console.log('state reset')
  };
  useEffect(() => {resetState();}, []);

  // Decrease the timer by one second until it hits zero or the user runs 
  // out of lives
  useEffect(() => {
    if (timeLeft > 0 && props.livesLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, props.livesLeft]);

  // End the game if the timer hits zero or the user runs out of lives
  useEffect(() => {
    if (timeLeft === 0 || props.livesLeft === 0) {
      clearInterval();
      props.handleGameEnd(false)
    }
  }, [timeLeft, props.livesLeft]);

  // Convert seconds to minutes and seconds, and display the time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Render the timer
  return (
    <View>
      <Text style={props.style}>TIME: 
      {minutes}:{seconds < 10 ? '0' : ''}{seconds}</Text>
    </View>
  )
}

// Export the Timer component as the default export
export default Timer;
