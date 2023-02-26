import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

/**
 * A component that displays a prompt and a word, and allows the user to 
 * switch between questions.
 * @param {Object} props - The component props.
 * @param {string} props.prompt - The prompt text.
 * @param {string} props.word - The word to be displayed.
 * @param {function} props.onToggle - The function to be called when the user 
 * toggles the question.
 * @returns {JSX.Element} A JSX.Element containing the prompt, word, and 
 * buttons to switch questions.
 */
export default function SwitchQuestion(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.onToggle(false)}>
        <Icon name="arrowleft" size={22} color="#2699FB" />
      </TouchableOpacity>
      <Text style={styles.promptText}>
        <Text style={{ fontWeight: 'bold' }}>{props.prompt} </Text>
        <Text>{props.word}</Text>
      </Text>
      <TouchableOpacity onPress={() => props.onToggle(true)}>
        <Icon name="arrowright" size={22} color="#2699FB" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5EFF5',
    width: '100%',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    flexDirection: 'row',
    marginTop: 8.5,
  },

  promptText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#2699FB',
  },
});
