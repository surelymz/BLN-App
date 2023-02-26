import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

/**
 * A search bar component that includes an input field and a search icon.
 */
function SearchBar() {

    const handleSearch = () => {
      // to be added when result page is done.
    };
  
    return (
      <View style={styles.searchBarContainer}>
        <Icon 
        name="search1" 
        size={17} color="#EDF7FF" 
        style={{ marginRight: 8 }} />
        <TextInput
          placeholder={'SEARCH'}
          style={styles.searchInput}
          placeholderTextColor="#EDF7FF"
          onSubmitEditing={handleSearch}
        />
      </View>
    );
  }
  

export default SearchBar

const styles = StyleSheet.create({
    searchBarContainer: {
        height: 48,
        width: '100%',
        backgroundColor: '#2699FB',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 23,
    },

    searchInput: {
        color:"#EDF7FF",
        fontSize: 14,
        fontWeight: "700",
        width: "80%"
    }
})
