import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import SwitchQuestion from './components/SwitchQuestion'
import Textbox from './components/Textbox'
import Timer from './components/Timer'



export default function FillInTheBlank(){

    /**
     * this function will get game data from backend. for now it uses 
     * temporary data for development
     * @returns temporary demo data
     */
    function getData(){

        return ({
            text: 'Lorem; ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem; ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad leftminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        
            questionWords: ['esse', 'lorem'],
            lives: 5,
            time: 200,
        })
    }

    // get data for game and create an array of indivisual words from text
    const gameData = getData()
    const textArray = gameData.text.split(" ")

    // set initial game state
    const [gameState, setGameState] = useState({
        currentWord: gameData.questionWords[0],
        answerBoxes: gameData.questionWords.map((word, index) => ({
          key: index,
          displayedText: '_ _ _ _ _',
          answer: word,
          correct: false,
          submited: false,
        })),
        livesLeft: gameData.lives,
      });

    /**
     * changes state of current selected word based on which arrow is 
     * pressed. parameter is a boolean value which is true if the right 
     * arrow was pressed and false if the left is pressed.
     * @param {boolean} right 
     */
    function onChangeWord(right) {
        const words = gameData.questionWords;
        const index = words.indexOf(gameState.currentWord);
        const newIndex = (index + (right ? 1 : -1) + words.length)
         % words.length;
        setGameState(prevState => ({
            ...prevState,
            currentWord: words[newIndex]
        }));
          
    }


    /**
     * Handle the press of an answer box
     * @param {number} key - The key of the answer box in the array of 
     * answer boxes
     */
    const onAnswerBoxPress = (key) => {
        // Get the current answer box
        let updatedBox = gameState.answerBoxes[key];

        // Update the displayed text to the current word
        updatedBox.displayedText = gameState.currentWord.toLowerCase();
    
        // Check if the answer is correct
        updatedBox.correct = (
        updatedBox.displayedText.toLowerCase() ===
        updatedBox.answer.toLowerCase()
        );
    
        // Set the submitted flag to false
        updatedBox.submited = false;
    
        // Update the answer box in the state
        setGameState((prevState) => ({
        ...prevState,
        answerBoxes: [
            ...prevState.answerBoxes.slice(0, key),
            { ...prevState.answerBoxes[key], ...updatedBox },
            ...prevState.answerBoxes.slice(key + 1),
        ],
        }));
    };
    
    
    // this is temp code for helping development. resets gameState on mount
    const resetState = () => {
        setGameState({currentWord: gameData.questionWords[0],
            answerBoxes: gameData.questionWords.map((word, index) => ({
              key: index,
              displayedText: '_ _ _ _ _',
              answer: word,
              correct: false,
              submited: false,
            })),
        livesLeft: gameData.lives})
        console.log('state reset')
    };
    useEffect(() => {resetState();}, []);


    /**
     * updates gameState on press of submit button. ends game if player wins 
     * or loses 
     */
    function onToggleSubmit() {
        
        // set every boxes submited property to true
        // this tells icons to show
        const updatedAnswerBoxes = gameState.answerBoxes.map(box => {
        return {
            ...box,
            submited: true,
        }
        })
        
        // if each word is right, game is won
        const gameWon = updatedAnswerBoxes.every(box => box.correct)
    
        if (gameWon) {
            handleGameEnd(true)
            setGameState(prevState => ({
                ...prevState,
                answerBoxes: updatedAnswerBoxes,
            }))
        } else {
            // new lives left decreases if game not won and lives not 0
            const newLivesLeft = gameState.livesLeft != 0 ?
            gameState.livesLeft - 1 : 0
            if (newLivesLeft == 0) {
                handleGameEnd(false)
            }
            setGameState(prevState => ({
                ...prevState,
                answerBoxes: updatedAnswerBoxes,
                livesLeft: newLivesLeft,
            }))
        }
    }
    
      
    /**
     * takes in true if player has won and false otherwise
     * @param {boolean} playerWon 
     */
    function handleGameEnd(playerWon){
        // code incomplete
    }


    return(
        <View style={styles.gameContainer}> 
            <View style={styles.banner}>
                <View style={{flex:1, flexDirection:"row"}}>
                    <TouchableOpacity>
                        <Icon 
                            name="arrowleft" size={22} 
                            color="#2699FB"
                            />
                        <View style={{flex:1}}></View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.bannerText}>FILL IN THE BLANK</Text>
                <View style={{flex:1}}></View>
            </View>
            <View style={styles.textContainer}>
                <Textbox 
                    text={gameData.text} 
                    questionWords={gameData.questionWords}
                    currentWord={gameState.currentWord}
                    textArray={textArray}
                    wordsArray={gameData.questionWords}
                    answerBoxes={gameState.answerBoxes}
                    onAnswerBoxPress={onAnswerBoxPress}>
                </Textbox>
            </View>
            <SwitchQuestion prompt='ENTERED THE WORD:' 
            word={gameState.currentWord.toUpperCase()}
            onToggle={onChangeWord}/>
            <View style={styles.livesAndTimeContainer}>
                <View  style={styles.livesCounterContainer}>
                    <Icon 
                    name="heart" size={18} 
                    color="#2699FB" />
                    <Text style={styles.livesAndTimerText}> 
                    X {gameState.livesLeft} LIVES
                    </Text>
                </View>
                <View  style={styles.timerContainer}>
                    <Timer 
                    style={styles.livesAndTimerText}
                    time={gameData.time}
                    handleGameEnd={handleGameEnd}
                    livesLeft={gameState.livesLeft}
                    ></Timer>
                </View>
            </View>
            <TouchableOpacity  
            style={styles.submitButton}
            onPress={onToggleSubmit}>
                <Text style={{
                    fontWeight: '700', 
                    color:'white', 
                    fontSize: 14}}
                    >
                    SUBMIT
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    gameContainer: {
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },

    banner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    bannerText: {
        fontSize: 14,
        color:"#2699FB",
        fontWeight: '700',
        flex: 2,
        textAlign: 'center',
    },

    textContainer: {
        padding: 10,
        borderColor: '#707070',
        borderWidth: 1,
        flex: 12,
        width: '100%',
    },

    livesAndTimeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1.2,
        width: '100%',
        paddingHorizontal: 10,
    },

    livesCounterContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },

    livesAndTimerText: {
        fontSize: 14,
        color:"#2699FB",
        fontWeight: 'bold',
        marginLeft: 5,
    },

    timerContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },

    submitButton: {
        borderRadius: 3,
        backgroundColor: '#2699FB',
        height: 48,
        width: '95%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
})
