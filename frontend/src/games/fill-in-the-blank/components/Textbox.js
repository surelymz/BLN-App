import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import AnswerBox from './AnswerBox';

/**
 * Returns the first word in an array of words that appears in a given 
 * string.
 * @param {string} inputString - The string to search for a word.
 * @param {string[]} wordsArray - An array of words to search for in the 
 * string.
 * @returns {string|false} - Returns the first matching word, or false if no 
 * match is found.
 */
function getSubstringFromArray(inputString, wordsArray) {
  for (let i = 0; i < wordsArray.length; i++) {
    if (inputString.toLowerCase().includes(wordsArray[i].toLowerCase())) {
      return wordsArray[i];
    }
  }
  return false;
}

/**
 * A scrollable textbox component that displays text with certain words 
 * replaced with answer boxes.
 * @param {Object} props - Component props.
 * @param {string[]} props.textArray - An array of strings to display as 
 * text.
 * @param {string[]} props.wordsArray - An array of words to be replaced with 
 * answer boxes.
 * @param {Object[]} props.answerBoxes - An array of answer boxes to display.
 * @param {Function} props.onAnswerBoxPress - A function to be called when an 
 * answer box is pressed.
 * @returns {JSX.Element} - Returns the JSX code for the component.
 */
export default function Textbox(props) {
  // keep track of which words have been used, avoids duplications
  let usedWords = [];

  return (
    <ScrollView>
      <Text style={styles.basicText}>
        {props.textArray.map((stringFromtext, index) => {
          const targetWord = getSubstringFromArray(stringFromtext,
             props.wordsArray);
        /* 
         * Creates blank if current word is a question word
         * and has not been used as blank before
         * target word will be false if string does not contain a question 
         * word
         */   
          if (targetWord && !usedWords.includes(targetWord)) {
            usedWords.push(targetWord);
            return (
              <AnswerBox
                key={index}
                stringFromtext={stringFromtext}
                wordsArray={props.wordsArray}
                answerBoxes={props.answerBoxes}
                targetWord={targetWord}
                onAnswerBoxPress={props.onAnswerBoxPress}
                style={styles.basicText}
                index={index}
              />
            );
          // Displays normal text if not a question word
          } else {
            return (
              <Text style={styles.basicText} key={index}>
                <Text>{stringFromtext} </Text>
              </Text>
            );
          }
        })}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  basicText: {
    fontSize: 20,
    fontWeight: '480',
    color: '#2699FB',
    lineHeight: 27,
  },
});
