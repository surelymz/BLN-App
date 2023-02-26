import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

/**
 * Renders a course category with an image and a subject text.
 * 
 * @param {object} props - The props object containing the following 
 *  properties:
 *   - category (object): The category object to be displayed, containing a 
 *      key, an image, and a subject.
 *   - categoryStates (object): An object containing the current state of   
 *      each category (i.e. whether it is selected or not).
 *   - onToggle (function): A function to be called when the category is 
 *      toggled (i.e. selected or deselected).
 * 
 * @returns A TouchableOpacity component containing the course category image 
 *  and subject text.
 */
function CourseCategory(props) {
  return (
    <TouchableOpacity
      style={[
        styles.categoryBox,
        {
          backgroundColor: props.categoryStates[props.category.key]
            ? '#2699FB'
            : '#FFF'
        }
      ]}
      onPress={() => props.onToggle(props.category.key)}
    >
      <Image
        source={props.category.image}
        style={styles.categoryImage}
      />
      <Text
        style={[
          styles.subject,
          {
            color: props.categoryStates[props.category.key]
              ? '#FFF'
              : '#2699FB'
          }
        ]}
      >
        {props.category.subject}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryBox: {
    height: 89,
    width: 97,
    backgroundColor: '#FFFFFF',
    borderColor: '#707070',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  categoryImage: {
    width: 65,
    height: 46
  },

  subject: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 9
  }
});

export default CourseCategory;
