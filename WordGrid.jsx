import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const gridWidth = 300; // set the width of the grid
const cellWidth = gridWidth / 10; // calculate the width of each cell
const wordList = ['apple', 'banana', 'cherry', 'grape', 'lemon', 'orange', 'pear', 'strawberry', 'watermelon']; // define the list of words

export default function WordGrid() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    // create the grid with random letters and hidden words
    const newGrid = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65); // generate a random uppercase letter
        const cell = {
          letter: randomLetter,
          hidden: true, // set the cell as hidden by default
        };
        row.push(cell);
      }
      newGrid.push(row);
    }

    // add the words to the grid
    wordList.forEach(word => {
      const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical'; // randomly choose the direction of the word
      let startX = Math.floor(Math.random() * (10 - word.length)); // generate a random starting X coordinate
      let startY = Math.floor(Math.random() * (10 - word.length)); // generate a random starting Y coordinate

      // add the word to the grid
      for (let i = 0; i < word.length; i++) {
        const x = direction === 'horizontal' ? startX + i : startX;
        const y = direction === 'vertical' ? startY + i : startY;
        newGrid[y][x].letter = word[i];
        newGrid[y][x].hidden = false;
      }
    });

    setGrid(newGrid);
  }, []);

  return (
    <View style={styles.grid}>
      {grid.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((cell, j) => (
            <Text key={j} style={[styles.cell, cell.hidden ? styles.hidden : null]}>{cell.letter}</Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    width: gridWidth,
    height: gridWidth,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: cellWidth,
    height: cellWidth,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hidden: {
    backgroundColor: 'gray',
    color: 'white',
  },
});
