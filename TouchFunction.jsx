import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const gridWidth = 300; // set the width of the grid
const cellWidth = gridWidth / 10; // calculate the width of each cell

export default function WordGrid() {
  const [grid, setGrid] = useState([]);

  // define the functions to handle touch events
  const handleTouchStart = (event, row, col) => {
    const newGrid = [...grid];
    newGrid[row][col].selected = true;
    setGrid(newGrid);
  };

  const handleTouchMove = (event, row, col) => {
    const newGrid = [...grid];
    newGrid[row][col].selected = true;
    setGrid(newGrid);
  };

  const handleTouchEnd = () => {
    const newGrid = [...grid];
    let selectedWord = '';

    // check each row for a selected word
    for (let i = 0; i < 10; i++) {
      let word = '';
      let foundWord = false;
      for (let j = 0; j < 10; j++) {
        if (newGrid[i][j].selected) {
          word += newGrid[i][j].letter;
          if (!foundWord) {
            foundWord = true;
          }
        } else {
          if (foundWord) {
            break;
          }
        }
      }
      if (wordList.includes(word)) {
        selectedWord = word;
        break;
      }
    }

    // check each column for a selected word
    for (let j = 0; j < 10; j++) {
      let word = '';
      let foundWord = false;
      for (let i = 0; i < 10; i++) {
        if (newGrid[i][j].selected) {
          word += newGrid[i][j].letter;
          if (!foundWord) {
            foundWord = true;
          }
        } else {
          if (foundWord) {
            break;
          }
        }
      }
      if (wordList.includes(word)) {
        selectedWord = word;
        break;
      }
    }

    // reset the selection state of each cell
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        newGrid[i][j].selected = false;
      }
    }

    // display the selected word
    alert(selectedWord);
    setGrid(newGrid);
  };

  // create the grid
  const createGrid = () => {
    const newGrid = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65); // generate a random uppercase letter
        const cell = {
          letter: randomLetter,
          selected: false, // set the cell as unselected by default
        };
        row.push(cell);
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

  return (
    <View style={styles.grid}>
      {grid.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((cell, j) => (
            <Text
              key={`${i}-${j}`}
              style={[styles.cell, cell.selected ? styles.selected : null]}
              onTouchStart={event => handleTouchStart(event, i, j)}
              onTouchMove={event => handleTouchMove(event, i, j)}
              onTouchEnd={handleTouchEnd}
            >
              {cell.letter}
            </Text>
          ))}
        </View>
        ))}
    </View>
    );
}

