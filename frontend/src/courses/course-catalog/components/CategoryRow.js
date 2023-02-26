import { View, FlatList } from 'react-native';
import CourseCategory from '../components/CourseCategory'


/**
 * Renders a row of course categories using a FlatList component.
 * 
 * @param {object} props - The props object containing the following 
 *  properties:
 *   - categories (array): An array of course categories to be displayed.
 *   - categoryStates (object): An object containing the current state of 
 *     each category (i.e. whether it is selected or not).
 *   - onToggle (function): A function to be called when a category is 
 *     toggled (i.e. selected or deselected).
 * 
 * @returns A FlatList component containing a row of course categories.
 */
function CategoryRow(props){
    return(
      <FlatList 
        data={props.categories} 
        horizontal={true}
        renderItem={itemData => {
          return(
            <View style={{marginLeft: 22.5}}>
              <CourseCategory 
                category={itemData.item} 
                categoryStates={props.categoryStates}
                onToggle={props.onToggle}
              />  
            </View>
          );
        }}
      />
    );
}

export default CategoryRow;
