import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

/**
 * Splits a string at the given substring, including the substring as a 
 * separate element in the result array.
 * @param {string} inputString - The string to split.
 * @param {string} subString - The substring to split the inputString at.
 * @returns {(string[]|false)} An array of strings or false if no matches are 
 * found.
 */
function separatePunctuationFromString(inputString, subString) {
  const regex = new RegExp(`(${subString})`, 'i');
  const matches = inputString.split(regex);
  return matches.length > 1 ? matches : false;
}


/**
 * AnswerBox component - a box to display as an answer in the text.
 * Updates to answer when pressed and inserts an icon when answer is 
 * submitted.
 *
 * @param {Object} props - The props object for the AnswerBox component.
 * @param {string} props.stringFromtext - The text string from which to 
 * extract the answer box.
 * @param {string[]} props.wordsArray - An array of strings representing 
 * the answer words in the text.
 * @param {Object[]} props.answerBoxes - An array of objects 
 * representing the answer boxes in the text.
 * @param {string} props.targetWord - The target word to be extracted from 
 * the text.
 * @param {Function} props.onAnswerBoxPress - A function to handle the press 
 * event on the answer box.
 * @param {Object} props.styles - An object containing custom styles for the 
 * AnswerBox component.
 * @param {string} props.style - The style of the text.
 * 
 * @return {React.Component} A component representing an answer box in the 
 * text.
 */
function AnswerBox(props) {

  // icon component returned based on correctness of answerbox
  function ResultIcon(props) {
    if (props.box.submited) {
      return props.box.correct ? (
        <Icon name="check" size={25} color={'#18963A'} />
      ) : (
        <Icon name="close" size={25} color={'#BE203E'} />
      );
    } else {
      return null;
    }
  }

  // seperates punctuation so it can be added seperetly of the answerbox
  const separatedPuncArr = separatePunctuationFromString(
    props.stringFromtext,
    props.targetWord,
  );

  return (
    <Text style={props.style}>
      {separatedPuncArr.map((puncOrWord, index) => {
        // Add the target word
        if (puncOrWord.toLowerCase() === props.targetWord.toLowerCase()) {
          const boxKey = props.wordsArray.indexOf(props.targetWord);
          return (
            <Text key={index}>
              <Text
                onPress={() => props.onAnswerBoxPress(boxKey)}
                style={{ backgroundColor: '#B7F6C0', ...props.styles }}>
                {props.answerBoxes[boxKey].displayedText}
              </Text>
              <ResultIcon box={props.answerBoxes[boxKey]} />
            </Text>
          );
        }
        // Add punctuation
        else {
          return <Text key={index}>{puncOrWord}</Text>;
        }
      })}
      <Text style={props.style}>{' '}</Text>;
    </Text>
  );
}

export default AnswerBox;
